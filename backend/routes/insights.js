// routes/insights.js
const express = require("express");
const router = express.Router();

const {
  getRevenueInsights,
  getAudienceInsights,
  getHeatmapStats,
} = require("../controllers/insightsController");

// These must all be FUNCTIONS
router.get("/revenue", getRevenueInsights);
router.get("/audience", getAudienceInsights);
router.get("/heatmap", getHeatmapStats);

module.exports = router;
