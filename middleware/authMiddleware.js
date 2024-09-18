
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) return res.status(401).json({ error: 'No token provided' });
  
    try {
      const decoded = jwt.verify(token, process.env.SECRETE_KEY);
      req.user = decoded;
      const id= req.user.id
      // console.log("idddd",id)
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
  
