const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  class: {
    type: String,
    required: true
  },
  examType: {
    type: String,
    required: true
  },
  session: {
    type: String,
    required: true
  },
  studentsMarks: {
    type: Object,
    required: true
  },
  approved: {
    type: Boolean,
    default: false
  },
  locked: {
    type: Boolean,
    default: false
  },
  date_created: {
    type: Date,
    required: true,
    default: Date.now
  },
  last_modified: {
    type: Date,
    default: null
  }
});


module.exports = mongoose.model("Result", resultSchema);