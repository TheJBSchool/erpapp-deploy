const mongoose = require('mongoose');

const createdBySchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const resultSchema = new mongoose.Schema({
  class: {
    type: String,
    required: true
  },
  examType: {
    type: String,
    required: true
  },
  totalSubjectMarks:{
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
  editable: {
    type: Boolean,
    default: true
  },
  date_created: {
    type: Date,
    required: true,
    default: Date.now
  },
  last_modified: {
    type: Date,
    default: null
  },
  underBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  createdBy: {
    type: createdBySchema,
    required: true
  }
});


module.exports = mongoose.model("Result", resultSchema);