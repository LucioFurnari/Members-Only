const express = require('express');
const router = express.Router();
const user_controllers = require('../controllers/userControllers');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/sign-up', (req, res) => {
  res.render('sign-up', { errors: []});
});

router.post('/sign-up', user_controllers.user_create_post);
// Export router
module.exports = router;