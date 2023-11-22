const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const LocalStrategy = require('passport-local');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      };
      const match = await bcryptjs.compare(password, user.password);
      if(!match) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

exports.index = (req, res) => res.render('index', { user: req.user });

exports.user_signup_get = (req, res) => res.render('sign-up', { errors: [] });

exports.user_create_post = [
  body('name', 'The name should not be empty').trim().isLength({ min: 1}).escape(),
  body('lastName', 'The last name should not be empty').trim().isLength({ min: 1}).escape(),
  body('email', 'The email should not be empty and has to be an email').trim().isLength({ min: 1}).isEmail().escape(),
  body('password', 'The password should not be empty').trim().isLength({ min: 1}).escape(),
  body('confirm_password', 'The password is not the same').custom((value, { req }) => {
    return value === req.body.password;
  }),
  asyncHandler(async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.render('sign-up', { errors: errors.array(), inputs: {
          name: req.body.name,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          confirm_password: req.body.confirm_password,
          }
        });
      } else {
        bcryptjs.hash(req.body.password, 10 , async (err, hashedPassword) => {
          if (err) throw err;
          else {
            const user = new User({
              name: req.body.name,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hashedPassword,
              isMember: false,
              isAdmin: false,
            });
            const result = await user.save();
            res.redirect('/');
          }
        })
      }
    } catch (error) {
      return next(error)
    }
  })
]

exports.user_login_get = (req, res) => res.render('log-in');

exports.user_login_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/log-in'
});

exports.user_logout = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/')
  });
};

exports.membership_get = (req, res) => res.render('membership');

exports.validate_membership = async (req, res) => {
  if (req.body.membership === process.env.MEMBER_CODE) {
    const user = await User.findOneAndUpdate({ name: req.user.name }, { isMember: true });
    res.redirect('/');
  } else {
    res.redirect('/membership');
  }
};