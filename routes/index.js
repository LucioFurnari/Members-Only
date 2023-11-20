const express = require('express');
const router = express.Router();
const { index, user_create_post, user_signup_get } = require('../controllers/userControllers');

router.get('/', index);

router.get('/sign-up', user_signup_get);

router.post('/sign-up', user_create_post);
// Export router
module.exports = router;