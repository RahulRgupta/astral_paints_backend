const express = require('express');
const app = express();
const sequelize = require('./config/config');
require('dotenv').config()

//
const adminRoute = require('./router/adminRouter')
const cmaRoute = require('./router/cmaRouter')
const dashboardRoute = require('./router/dashboardRouter')
// Middleware
app.use(express.json());

app.use(adminRoute)
app.use(cmaRoute)
app.use(dashboardRoute)


// Sync DB and start server
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(err => {
  console.log('Database sync error:', err);
});
