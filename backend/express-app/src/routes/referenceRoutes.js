const express = require("express");
const router = express.Router();
const referenceController = require("../controllers/referenceController");
const rbacMiddleware = require("../middleware/rbacMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

// Route to get list of skills grouped by category
router.get(
  "/skills",
  authMiddleware,
  rbacMiddleware(["participant", "organizer"]),
  referenceController.listSkills
);

// Route to get list of types
router.get(
  "/types",
  authMiddleware,
  rbacMiddleware(["participant", "organizer"]),
  referenceController.listTypes
);

// Route to get list of type-skills links
router.get(
  "/type-skills",
  authMiddleware,
  rbacMiddleware(["participant", "organizer"]),
  referenceController.listTypeSkills
);

module.exports = router;
