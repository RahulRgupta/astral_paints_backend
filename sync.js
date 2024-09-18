const sequelize = require('./config/config'); 
const Admin = require('./models/userModel'); 
const HomePageContent = require('./models/homePageModel');
const RecentActivity = require('./models/recentActivityModel');

(async () => {
    try {
      await sequelize.sync({ force: false }); // force: true will drop the table if it already exists
      console.log('Admin table created successfully!');
    } catch (error) {
      console.error('Unable to create the Admin table:', error);
    } finally {
      await sequelize.close(); 
    }
  })();


// //add content of homepage

// const homePageContent = {
//   title: 'Welcome to Our Website',
//   description: 'We offer the best products.',
//   keywords: 'products, ecommerce, best',
//   banners: ['banner1.jpg', 'banner2.jpg'], // Array of banner URLs
// };

// (async () => {
//   try {
//     const newContent = await HomePageContent.create(homePageContent);
//     console.log('HomePageContent added:', newContent);
//   } catch (error) {
//     console.error('Error adding HomePageContent:', error);
//   }
// })();
