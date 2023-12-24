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
    underBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
})

module.exports = mongoose.model("Subject", subjectSchema);