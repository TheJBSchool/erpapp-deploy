const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    ID: {
        type: String,
        required: true,
        unique: true
    },
    rollno:{
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    class: {
        type: String,    
        required: true,
    },
    section: {
        type: String,   
        required: true,
    },
    group: {
        type: String,   
        required: true,
        enum: ["Pre", "Primary", "Secondary"]
    },
    contact: {
        type: Number,
        required: true
    },
    emergency_contact: {
        type: Number,
        required: true
    },
    house: {
        type: String,
        required: true,
    },
    admission_date: {
        type: String,
        required: true,
    },
    father_name: {
        type: String,
        required: true,
    },
    mother_name: {
        type: String,
        required: true,
    },
    religion: {
        type: String,
        required: true,
    },
    blood_group: {
        type: String,
        required: true,
    },
    DOB: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    van: {
        type: String,
        required: true
    },
    session: {
        type: String,
        enum: ["2022-23", "2023-24"]
    },
    underBy:{
        type: mongoose.ObjectId,
        required: true
    },
    feePayments: [
        {
            quarter: Number,         // 1, 2, 3, or 4
            paymentDate: Date       // Date when the fee was paid for the quarter
        }
    ],
    pending_fees: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Student", studentSchema);