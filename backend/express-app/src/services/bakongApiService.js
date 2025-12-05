const axios = require("axios");
const { getAccessToken } = require("./bakongAuthService");
require("dotenv").config();
const models = require("../models");
const { Op } = require("sequelize");
const BASE_URL = process.env.BAKONG_BASE_URL;

// --- Helper function for making authorized API calls ---
const bakongApiCall = async (endpoint, data) => {
  const token = await getAccessToken();
  const url = `${BASE_URL}/v1/${endpoint}`;

  const response = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// =======================================================
// 1. GENERATE DEEPLINK
// =======================================================
exports.generatePaymentDeeplink = async (khqrString, transactionRef) => {
  // Source Info setup (must be static for your app)
  const sourceInfo = {
    appIconUrl: "https://cdn-icons-png.flaticon.com/512/825/825590.png",
    appName: "Event Match Hub",
    // CRITICAL: Ensure the callback URL is registered and includes the transaction ref
    appDeepLinkCallback: `https://google.com/${transactionRef}`,
  };

  const requestBody = {
    qr: khqrString,
    sourceInfo: sourceInfo,
  };
  try {
    const responseData = await bakongApiCall(
      "generate_deeplink_by_qr",
      requestBody
    );

    if (responseData.responseCode === 0) {
      return responseData.data.shortLink;
    } else {
      throw new Error(
        `Deeplink Failed: ${responseData.responseMessage} (Code: ${responseData.errorCode})`
      );
    }
  } catch (error) {
    console.error("Generate Deeplink API error:", error.message);
    throw new Error("Failed to communicate with Bakong service.");
  }
};

// =======================================================
// 2. CHECK STATUS BY MD5 HASH
// =======================================================
exports.checkTransactionByMD5 = async (md5Hash) => {
  try {
    const responseData = await bakongApiCall("check_transaction_by_md5", {
      md5: md5Hash,
    });

    // Response Code 0: Success. Transaction completed.
    if (responseData.responseCode === 0) {
      return { status: "COMPLETED", details: responseData.data };
    }

    // Error Code 1: Transaction could not be found (PENDING)
    if (responseData.errorCode === 1) {
      return { status: "PENDING" };
    }

    // Error Code 3: Transaction failed.
    if (responseData.errorCode === 3) {
      return { status: "FAILED", message: responseData.responseMessage };
    }

    // Catch any other unexpected Bakong error codes
    return { status: "UNKNOWN_ERROR", message: responseData.responseMessage };
  } catch (error) {
    throw new Error(`Payment verification failed: ${error.message}`);
  }
};

// =======================================================
// 2. CHECK STATUS BY BATCH OF MD5 HASHES
// =======================================================
exports.checkBatchTransactionByMD5 = async (md5Hashes) => {
  try {
    const responseData = await bakongApiCall("check_transaction_by_md5_list", {
      md5: md5Hashes,
    });

    // Response Code 0: Success. Transaction completed.
    if (responseData.responseCode === 0) {
      return { status: "COMPLETED", details: responseData.data };
    }
    // Error Code 1: Transaction could not be found (PENDING)
    if (responseData.errorCode === 1) {
      return { status: "PENDING" };
    }
    // Error Code 3: Transaction failed.
    if (responseData.errorCode === 3) {
      return { status: "FAILED", message: responseData.responseMessage };
    }
    // Catch any other unexpected Bakong error codes
    return { status: "UNKNOWN_ERROR", message: responseData.responseMessage };
  } catch (error) {
    throw new Error(`Payment verification failed: ${error.message}`);
  }
};

exports.autoCheckPaymentStatus = async () => {
  // Check if transaction exists
  const transaction = await models.PlanTransaction.findAll({
    where: { status: "pending" },
  });

  for (const tx of transaction) {
    // If transaction is older than 24 hours and still pending, mark as failed
    if (tx.created_at < new Date(Date.now() - 24 * 60 * 60 * 1000)) {
      await models.PlanTransaction.destroy({
        where: { transaction_id: tx.transaction_id },
      });
      console.log(
        `Transaction ${tx.transaction_id} marked as failed due to timeout.`
      );
    } else {
      const verificationResult = await exports.checkTransactionByMD5(
        tx.transactionMD5
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
        tx.status = "completed";
        tx.transaction_date = formattedDate; // string
        tx.externalRef = verificationResult.details.externalRef;
        await tx.save();

        // 4️⃣ Calculate subscription end date (+1 month)
        const endDate = new Date(dateObj);
        endDate.setMonth(endDate.getMonth() + 1);

        const subscriptionCheck = await models.Subscription.findOne({
          where: { transaction_id: tx.transaction_id, status: "active" },
        });

        if (!subscriptionCheck) {
          // 5️⃣ Create subscription
          await models.Subscription.create({
            user_id: tx.user_id,
            transaction_id: tx.transaction_id,
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
        }
      } else if (verificationResult.status.toUpperCase() === "FAILED") {
        // Delete transaction where failed
        transaction.status = "failed";
        transaction.failReason = verificationResult.message;
        await transaction.save();
        console.log(`Transaction ${tx.transaction_id} marked as failed.`);
      }
    }
  }

  const registrationTransaction = await models.RegisterTransactions.findAll({
    where: { status: "pending" },
  });

  for (const rtx of registrationTransaction) {
    if (rtx.created_at < new Date(Date.now() - 24 * 60 * 60 * 1000)) {
      await models.PlanTransaction.destroy({
        where: { transaction_id: rtx.transaction_id },
      });
      console.log(
        `Transaction ${rtx.transaction_id} marked as failed due to timeout.`
      );
    } else {
      const verificationRegisterResult = await exports.checkTransactionByMD5(
        rtx.transactionMD5
      );
      if (verificationRegisterResult.status.toUpperCase() === "COMPLETED") {
        // Update transaction status in DB
        // 1️⃣ Convert timestamp to Date object
        const dateObj = new Date(
          verificationRegisterResult.details.createdDateMs
        );
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
        rtx.status = "completed";
        rtx.transaction_date = formattedDate; // string
        rtx.externalRef = verificationRegisterResult.details.externalRef;
        await rtx.save();

        await models.Registration.update(
          { is_paid: true },
          { where: { registration_id: rtx.registration_id } }
        );

        console.log(
          `Registration Transaction ${rtx.registration_id} completed.`
        );
      } else if (verificationRegisterResult.status.toUpperCase() === "FAILED") {
        // Delete transaction where failed
        rtx.status = "failed";
        rtx.failReason = verificationRegisterResult.message;
        await rtx.save();
        console.log(
          `Registration Transaction ${rtx.transaction_id} marked as failed.`
        );
      }
    }
  }
};

exports.autoCheckExpiredSubscriptions = async () => {
  const now = new Date();
  const expiredSubscriptions = await models.Subscription.findAll({
    where: {
      expires_at: { [Op.lt]: now },
      status: "active",
    },
    attributes: ["subscription_id", "transaction_id"],
  });

  for (const subscription of expiredSubscriptions) {
    subscription.status = "expired";
    await subscription.save();
  }
};
