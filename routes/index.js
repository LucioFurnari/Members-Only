const express = require('express');
const router = express.Router();
const { index, user_create_post, user_signup_get, user_login_get, user_login_post, user_logout, membership_get, validate_membership } = require('../controllers/userControllers');
const { create_message, delete_message } = require('../controllers/messageController');

router.get('/', index);

router.get('/sign-up', user_signup_get);

router.post('/sign-up', user_create_post);

router.get('/log-in', user_login_get);

router.post('/log-in', user_login_post);

router.get('/log-out', user_logout);

router.get('/membership', membership_get)

router.post('/membership', validate_membership);

router.post('/create_msg', create_message);

router.post('/delete_msg', delete_message);

// Export router
module.exports = router;