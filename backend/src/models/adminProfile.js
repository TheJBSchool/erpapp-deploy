const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    school_name: {
        type: String,
        required: true
    },
    principal_name: {
        type: String,
        required: true
    },
    aadhar_no: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    school_logo: {
        type: String,
    },
    messages: [{
        teacher_name: {
            type: String
        },
        subject: {
            type: String
        },
        desc: {
            type: String
        }
    }]
});

module.exports = mongoose.model("Admin", adminSchema);