const RecentActivity = require('../models/recentActivityModel');

exports.getRecentActivities = async (req, res) => {
  try {
    
    const activities = await RecentActivity.findAll({
      order: [['timestamp', 'DESC']], 
    });

  
    res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
