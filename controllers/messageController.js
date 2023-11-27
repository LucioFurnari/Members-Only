const Message = require('../models/message');
const { body, validationResult } = require('express-validator');

exports.create_message = async (req, res) => {
  if (req.isAuthenticated()) {
    const message = new Message({
      title: req.body.title,
      text: req.body.message,
      timestamp: new Date(),
      user: req.user._id
    })
  
    await message.save()
    res.redirect('/')
  }
};