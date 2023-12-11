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
})

module.exports = mongoose.model("ExamType", examTypeSchema);