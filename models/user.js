const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 60 },
  lastName: { type: String, required: true, minLength: 3, maxLength: 60 },
  email: { type: String, required: true, minLength: 3, maxLength: 60 },
  password: { type: String, required: true },
  isMember: { type: Boolean, required: true },
  isAdmin: { type: Boolean, required: true },
});

module.exports = mongoose.model('User', UserSchema);