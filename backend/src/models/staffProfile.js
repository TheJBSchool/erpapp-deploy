const mongoose = require('mongoose');

const monthlyDataSchema = new mongoose.Schema({
    total_working_days: {
        type: Number,
        required: true,
    },
    present: {
        type: Number,
        required: true,
    },
    absent: {
        type: Number,
        required: true,
    },
    half_days: {
        type: Number,
        required: true,
    },
    paid_leaves: {
        type: Number,
        required: true,
    },
    available_leaves: {
        type: Number,
        required: true,
    },
    remaining_leaves: {
        type: Number,
        required: true,
    },
    total_salary: {
        type: Number,
        required: true,
    },
    deducted_salary: {
        type: Number,
        required: true,
    },
    remaining_amount: {
        type: Number,
        required: true,
    },
});

const sessionSchema = new mongoose.Schema({
    session_name: {
        type: String,
        required: true,
    },
    months: {
        // Using month names (e.g., January, February) as keys
        type: Map,
        of: monthlyDataSchema,
        required: true,
    },
});

const staffSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    fatherName: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    emergency_contact: {
        type: Number,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    jobPosition: {
        type: String,
        required: true,
    },
    aadharNo: {
        type: String,
        required: true,
    },
    joining_date: {
        type: String,
        required: true,
    },
    total_salary:{
        type: String,
        required: true,
    },
    sessions: [sessionSchema],
    underBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

module.exports = mongoose.model("Staff", staffSchema);
