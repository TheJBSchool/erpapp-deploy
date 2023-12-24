const mongoose = require('mongoose');

const circularSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    target:[{
        type: String,    
        required: true,
    }],
    description: {
        type: String,
        required: true
    },
    date_started: {
        type: Date,
        required: true
    },
    date_modified: {
        type: Date,
    },
    underBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
})

module.exports = mongoose.model("Circular", circularSchema);