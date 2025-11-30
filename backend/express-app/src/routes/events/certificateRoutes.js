const express = require("express");
const router = express.Router();
const certificateController = require("../../controllers/certificateController");
const authMiddleware = require("../../middleware/authMiddleware");
const rbacMiddleware = require("../../middleware/rbacMiddleware"); // For role checks
const upload = require("../../middleware/uploadMiddleware");

/* //////////////////////////////////////////////////////////////////////////////////
                              Certificate Organizer Routes
*/ //////////////////////////////////////////////////////////////////////////////////
// ================== Manage Event Certificates ==================
//POST /api/v1/events/:event_id/certificates/generate - Generate certificates for event participants (only for organizers)
router.post(
  "/:event_id/certificates/generate",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  upload.fields([{ name: "signature", maxCount: 1 }]),
  // upload.single("signature"),
  certificateController.createCertificates
);

// GET /api/v1/events/:event_id/certificates/:cert_id - View specific certificate details
router.get(
  "/:event_id/certificates/:cert_id",
  authMiddleware,
  rbacMiddleware(["organizer", "participant"]),
  certificateController.viewSpecificCertificate
);

// GET /api/v1/events/:event_id/certificates - View all certificates for an event (only for organizers)
router.get(
  "/:event_id/certificates",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  certificateController.viewAllCertificates
);

//GET /api/v1/events/certificates/template - Get certificate template (accessible only to organizers)
router.get(
  "/certificates/template",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  certificateController.getCertificateTemplate
);

module.exports = router;
