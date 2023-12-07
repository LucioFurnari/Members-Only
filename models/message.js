const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 100 },
  text: { type: String, required: true, minLength: 1 },
  timestamp: { type: String, required: true },
  user: { type: Schema.ObjectId, required: true, ref: 'User' },
});

// Export model //
module.exports = mongoose.model('Message', MessageSchema);