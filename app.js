const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const sassMiddleware = require('node-sass-middleware');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Import router
const Router = require('./routes/index');

mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(sassMiddleware({
  /* Options */
  src: path.join(__dirname, 'public', 'stylesheet'),
  dest: path.join(__dirname, 'public', 'stylesheet'),
  debug: true,
  outputStyle: 'compressed',
  prefix:  '/public/stylesheet'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));
// Note: you must place sass-middleware *before* `express.static` or else it will
// not work.
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', Router);

app.listen(3000, () => console.log('app listening on port 3000!'));
