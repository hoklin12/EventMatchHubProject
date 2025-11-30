const express = require("express");
const router = express.Router();
const userPortfolioController = require("../../controllers/userPortfolioController");
const authMiddleware = require("../../middleware/authMiddleware");
const rbacMiddleware = require("../../middleware/rbacMiddleware"); // For role checks

/* //////////////////////////////////////////////////////////////////////////////////
                               User Portfolio Routes
*/ //////////////////////////////////////////////////////////////////////////////////
// POST /api/v1/users/portfolio - Create a portfolio item for the authenticated user
router.post(
  "/portfolio",
  authMiddleware,
  rbacMiddleware(["participant"]),
  userPortfolioController.createPortfolio
);

//GET /api/v1/users/portfolio - Get all portfolio item
router.get(
  "/portfolio",
  authMiddleware,
  rbacMiddleware(["participant"]),
  userPortfolioController.getAllPortfolios
);

// GET /api/v1/users/portfolio/:portf_id - Get a specific portfolio item
router.get(
  "/portfolio/:portf_id",
  authMiddleware,
  rbacMiddleware(["organizer", "participant"]),
  userPortfolioController.getPortfolioById
);

// PUT /api/v1/users/portfolio/:portf_id - Update a portfolio item
router.put(
  "/portfolio/:portf_id",
  authMiddleware,
  rbacMiddleware(["participant"]),
  userPortfolioController.updatePortfolio
);

// DELETE /api/v1/users/portfolio/:portf_id - Delete a portfolio item
router.delete(
  "/portfolio/:portf_id",
  authMiddleware,
  rbacMiddleware(["participant"]),
  userPortfolioController.deletePortfolio
);
module.exports = router;
