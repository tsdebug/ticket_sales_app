const express = require('express');
const router = express.Router();
const insightsController = require('../controllers/insightsController');

// Route: GET /api/insights/revenue
router.get('/revenue', insightsController.getRevenueInsights);

// Route: GET /api/insights/audience
router.get('/audience', insightsController.getAudienceInsights);

// Route: GET /api/insights/heatmap
router.get('/heatmap', insightsController.getHeatmapData);

module.exports = router;
