const Admin = require('../models/adminProfile');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  // console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized', message: "false"});
  }
  try {
    const decoded = jwt.verify(token, process.env.S_KEY);
    const adminDetails = await Admin.findOne({_id: decoded._id});
    req.adminDetails = adminDetails;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized', message: "false"});
  }
};

module.exports = auth;