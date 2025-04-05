// controllers/insightsController.js
exports.getAudienceInsights = async (req, res) => {
    try {
      const data = {
        demographics: {
          ageGroups: {
            "18-25": 150,
            "26-35": 100,
            "36-50": 60
          },
          locations: ["Mumbai", "Bangalore", "Delhi"],
          repeatAttendees: 75
        }
      };
  
      res.status(200).json(data);
    } catch (err) {
      console.error("Audience Insights Error:", err);
      res.status(500).json({ error: "Error fetching audience insights" });
    }
  };
  
  exports.getRevenueInsights = async (req, res) => {
    // same dummy setup
  };
  
  exports.getHeatmapStats = async (req, res) => {
    // same dummy setup
  };
  