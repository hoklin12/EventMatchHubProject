const express = require("express");
const router = express.Router();
const certificateController = require("../../controllers/certificateController");
const authMiddleware = require("../../middleware/authMiddleware");
const rbacMiddleware = require("../../middleware/rbacMiddleware"); // For role checks

/* //////////////////////////////////////////////////////////////////////////////////
                               User Certificate Routes
*/ //////////////////////////////////////////////////////////////////////////////////
//Get detail user certificates by cert_id
router.get(
  "/certificates/:cert_id",
  authMiddleware,
  rbacMiddleware(["organizer", "participant"]),
  certificateController.getCertificateById
);
module.exports = router;
