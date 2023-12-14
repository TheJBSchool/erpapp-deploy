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
const resultreqSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        required: true,
        default: Date.now
    },
    underBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdBy: {
        type: createdBySchema,
        required: true
    },
    resultId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model("ResultReq", resultreqSchema);