const HomePageContent = require('../models/homePageModel');
const RecentActivity = require('../models/recentActivityModel');
const fs = require('fs');
const path = require('path');

exports.getHomePageContent=async (req, res) => {
    try {
      const homePageContent = await HomePageContent.findAll();
      if (!homePageContent) {
        return res.status(404).json({ message: 'HomePageContent not found' });
      }
      res.json(homePageContent);
    } catch (error) {
      console.error('Error fetching home page content:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };


  // 
  exports.updateHomePageContent = async (req, res) => {
    const { pageType,title, description, keywords } = req.body;
    const adminid = req.user?.adminId;
    console.log("adminid",adminid) 
    try {
      const homePageContent = await HomePageContent.findOne();
      if (!homePageContent) {
        return res.status(404).json({ message: 'HomePageContent not found' });
      }
  
      // Track what fields were updated
      let actions = [];
  
      if (title && title !== homePageContent.title) {
        homePageContent.title = title;
        actions.push('Updated title');
      }
  
      if (description && description !== homePageContent.description) {
        homePageContent.description = description;
        actions.push('Updated description');
      }
  
      if (keywords && keywords !== homePageContent.keywords) {
        homePageContent.keywords = keywords;
        actions.push('Updated keywords');
      }
  
         // Handle banners (if new files are uploaded)
    if (req.files && req.files.length > 0) {
      const uploadedBanners = req.files.map(file => file.filename);
      
      if (homePageContent.banners && homePageContent.banners.length > 0) {
        homePageContent.banners.forEach(banner => {
          const filePath = path.join(__dirname, '../uploads/banners', banner);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); 
          }
        });
      }

      
      homePageContent.banners = uploadedBanners;
      actions.push('Updated banners');
    }
  
      // Save the updated content
      await homePageContent.save();
    

      // Log each action to RecentActivity
    for (const action of actions) {
      try {
        await RecentActivity.create({
          adminid: adminid || null,
          action,
          timestamp: new Date(), 
        });
        console.log('RecentActivity record created:', action);
      } catch (error) {
        console.error('Error creating RecentActivity record:', error);
      }
    }
  
      res.json({ message: 'HomePageContent updated successfully', homePageContent });
    } catch (error) {
      console.error('Error updating home page content:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  