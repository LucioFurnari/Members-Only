const Message = require('../models/message');
const { body, validationResult } = require('express-validator');
const { format, parseISO } = require('date-fns');
const { handleMessages } = require('../controllers/userControllers');

// Create message controller.
// The timestamp uses a current date that formats and then saves it as a string.
exports.create_message = [
  body('title')
  .trim().notEmpty().escape().withMessage("Don't leave the title empty.")
  .isLength({ max: 50}).withMessage('The title must have a maximum of 50 characters'),
  body('message', "Don't leave the message empty.")
  .trim().notEmpty().escape().withMessage("Don't leave the message empty.")
  .isLength({ max: 100}).withMessage('The message must have a maximum of 100 characters'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      handleMessages()
      .then((list) => {
        res.render('index', { user: req.user, messages: list, errors: errors.array() });
      });
    } else {
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
    }
  }
];

// This function capitalize the first char in the title.
function upperCaseTitle (title) {
  const textToArr = title.split("");
  textToArr[0] = textToArr[0].toUpperCase();
  const finalText = textToArr.join('');

  return finalText;
}