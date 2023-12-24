const mongoose = require('mongoose');

const examTypeSchema = new mongoose.Schema({
    class: {
        type: String,
        required: true
    },
    exams: [
        {
            examName: String, 
            totalMarks : String   
        }
    ],
    underBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
})

module.exports = mongoose.model("ExamType", examTypeSchema);