const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({subject: {
        type: String,
        // required: true
    },
    desc: {
        type: String,
        // required: true
    },
    status: {
        type: String,
        enum: ["Admin", "Teacher"],
        default: "Admin"
    }
})

module.exports = mongoose.model("Message", msgSchema);