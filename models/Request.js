const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  tutor: {
    type: ObjectId,
    required: true,
  },
  subject: {
    type: String,
    required: [true, 'Please add a Subject'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
});

module.exports = mongoose.model('Request', RequestSchema);
