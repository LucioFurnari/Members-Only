const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 100 },
  text: { type: String, required: true, minLength: 1, maxLength: 100 },
  timestamp: { type: Date, default: Date.now, required: true },
  user: { type: Schema.ObjectId, required: true, ref: 'User' },
});

// Export model //
module.exports = mongoose.model('Message', MessageSchema);