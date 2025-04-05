exports.getRevenueInsights = async (req, res) => {
    return res.json({
      totalRevenue: 32000,
      refunds: 1500,
      paymentMethods: {
        upi: 40,
        creditCard: 30,
        wallet: 30,
      },
    });
  };
  
  exports.getAudienceInsights = async (req, res) => {
    return res.json({
      demographics: {
        ageGroups: {
          "18-25": 120,
          "26-35": 95,
          "36-50": 45,
        },
        locations: ["Mumbai", "Delhi", "Bangalore"],
        repeatAttendees: 65,
      },
    });
  };
  
  exports.getHeatmapData = async (req, res) => {
    return res.json({
      ticketTypeBreakdown: {
        VIP: 25,
        "Early Bird": 40,
        General: 60,
      },
      peakTimes: ["12PM", "6PM"],
      slowPeriods: ["10AM", "3PM"],
    });
  };
  