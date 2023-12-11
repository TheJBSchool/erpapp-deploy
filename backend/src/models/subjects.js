const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    class: {
        type: String,
        required: true
    },
    subjects: [
        {
            subject: String, 
            teacher : String   
        }
    ],
})

module.exports = mongoose.model("Subject", subjectSchema);