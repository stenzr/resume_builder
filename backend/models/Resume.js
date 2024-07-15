const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sections: { type: Object, required: true }
});

module.exports = mongoose.model('Resume', resumeSchema);
