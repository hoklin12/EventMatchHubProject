const models = require("../models");
const {
  generateKhqrPayload,
  createQrCodeImage,
  createQRStand,
} = require("../utils/khqrUtils");
const bakongApiService = require("../services/bakongApiService");
const { hashJsonObject } = require("../utils/encryptUtils");
const { BakongKHQR } = require("bakong-khqr");

/**
 * POST /api/payments/initiate-subscription
 * Generates a unique KHQR code/deeplink for a plan payment.
 */
exports.initiateSubscriptionPayment = async (req, res, next) => {
  const userId = req.user.userId;
  const { planId, methodId } = req.body; // e.g., planId for the 'Pro' tier

  try {
    // --- VALIDATE PLAN ---
    const plan = await models.Plan.findByPk(planId);
    if (!plan || plan.price <= 0) {
      return res
        .status(400)
        .json({ message: "Invalid or free plan selected." });
    }

    // Check if plan exists
    const checkExistPlan = await models.Plan.findOne({
      where: { plan_id: planId },
    });

    if (!checkExistPlan) {
      return res.status(404).json({ message: "Selected plan does not exist." });
    }

    // Check if method exists
    const checkExistMethod = await models.PaymentMethod.findOne({
      where: { method_id: methodId },
    });
    if (!checkExistMethod) {
      return res
        .status(404)
        .json({ message: "Selected payment method does not exist." });
    }

    // --- 1. CREATE PENDING TRANSACTION RECORD ---
    const transactionRefHash = {
      user_id: userId,
      method_id: methodId,
      plan_id: planId,
      amount: plan.price,
      currency: "USD",
      dateTime: new Date().toISOString(),
    };

    const transactionRefHashString = hashJsonObject(
      JSON.stringify(transactionRefHash)
    );

    const transactionRef = `EMH-${transactionRefHashString.substring(0, 20)}`;

    const data = {
      price: plan.price,
      // price: 0.01,
      bakongAccountID: "vichet_kao@aclb",
      merchantName: "Vichet Kao",
      acquiringBank: "Aclena Bank",
      merchantCity: "Phnom Penh",
      mobileNumber: "85577613512",
      storeLabel: "Event Match Hub Plan",
      plan_name: plan.plan_name,
    };

    // --- 2. GENERATE KHQR PAYLOAD (STRING) ---
    const { khqrString, md5Hash } = generateKhqrPayload(transactionRef, data);
    let qrStand;
    if (khqrString) {
      const qrCodeImage = await createQrCodeImage(khqrString);
      qrStand = await createQRStand(qrCodeImage, data.merchantName);
      await models.PlanTransaction.create({
        method_id: methodId,
        plan_id: planId,
        user_id: userId,
        status: "pending",
        transactionMD5: md5Hash,
      });
    }
    // const decode = BakongKHQR.decode(khqrString);

    res.status(200).json({
      status: "pending",
      // khqrString: khqrString,
      md5Hash: md5Hash,
      // decode: decode,
      qrStand: qrStand,
    });
  } catch (error) {
    console.error("Payment Initiation Error:", error);
    next(error);
  }
};

// Checking payment status by MD5 hash in every 3s(3000ms) for pending transactions
exports.checkPaymentStatusMD5 = async (req, res, next) => {
  const { md5Hash } = req.params;
  const userId = req.user.userId;

  try {
    const transaction = await models.PlanTransaction.findOne({
      where: { transactionMD5: md5Hash, user_id: userId },
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    // --- 1. CHECK STATUS WITH BAKONG ---
    const verificationResult = await bakongApiService.checkTransactionByMD5(
      md5Hash
    );

    if (verificationResult.status.toUpperCase() === "COMPLETED") {
      // Update transaction status in DB
      // 1️⃣ Convert timestamp to Date object
      const dateObj = new Date(verificationResult.details.createdDateMs);

      // 2️⃣ Format date as string for database
      const formattedDate =
        dateObj.getFullYear() +
        "-" +
        String(dateObj.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(dateObj.getDate()).padStart(2, "0") +
        " " +
        String(dateObj.getHours()).padStart(2, "0") +
        ":" +
        String(dateObj.getMinutes()).padStart(2, "0") +
        ":" +
        String(dateObj.getSeconds()).padStart(2, "0");

      // 3️⃣ Update transaction
      transaction.status = "completed";
      transaction.transaction_date = formattedDate; // string
      transaction.externalRef = verificationResult.details.externalRef;
      await transaction.save();

      // 4️⃣ Calculate subscription end date (+1 month)
      const endDate = new Date(dateObj);
      endDate.setMonth(endDate.getMonth() + 1);

      const subscriptionCheck = await models.Subscription.findOne({
        where: { transaction_id: transaction.transaction_id, status: "active" },
      });
      if (!subscriptionCheck) {
        // 5️⃣ Create subscription
        await models.Subscription.create({
          user_id: transaction.user_id,
          transaction_id: transaction.transaction_id,
          status: "active",
          start_date: dateObj, // actual Date
          expires_at: endDate, // actual Date (+1 month)
        });

        const checkPlan = await models.Plan.findOne({
          where: { plan_id: transaction.plan_id },
        });
        switch (checkPlan.plan_id) {
          case "8512e6f3-2bb2-4b9a-9af1-d967d5ffbdf1":
            await models.User.update(
              { plan: "Enterprise" },
              { where: { user_id: transaction.user_id } }
            );
            break;
          case "8c414757-0ce6-4f0d-89e4-97cb9746446e":
            await models.User.update(
              { plan: "Premium" },
              { where: { user_id: transaction.user_id } }
            );
            break;
          default:
            await models.User.update(
              { plan: "Basic" },
              { where: { user_id: transaction.user_id } }
            );
        }
      } else {
        await models.User.update(
          { plan: "Basic" },
          { where: { user_id: transaction.user_id } }
        );
      }
      return res.status(200).json({
        status: verificationResult.status,
        detail: verificationResult.details,
        message: verificationResult.message,
      });
    } else if (verificationResult.status.toUpperCase() === "FAILED") {
      // Update transaction status to failed
      transaction.status = "failed";
      transaction.failReason = verificationResult.message;
      await transaction.save();
      return res.status(400).json({
        status: verificationResult.status,
        detail: verificationResult.details,
        message: verificationResult.message,
      });
    }
    return res.status(202).json({
      status: verificationResult.status,
      detail: verificationResult.details,
      message: verificationResult.message,
    });
  } catch (error) {
    console.error("Verification Status Check Error:", error);
    next(error);
  }
};
