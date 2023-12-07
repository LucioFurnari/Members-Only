const Message = require('../models/message');
const { body, validationResult } = require('express-validator');
const { format, parseISO } = require('date-fns');

// Create message controller.
// The timestamp uses a current date that formats and then saves it as a string.
exports.create_message = async (req, res) => {
  if (req.isAuthenticated()) {
    const message = new Message({
      title: upperCaseTitle(req.body.title),
      text: req.body.message,
      timestamp: format(new Date(), "PPPPp"),
      user: req.user._id
    })
  
    await message.save()
    res.redirect('/')
  }
};

function upperCaseTitle (title) {
  const textToArr = title.split("");
  textToArr[0] = textToArr[0].toUpperCase();
  const finalText = textToArr.join('');

  return finalText;
}