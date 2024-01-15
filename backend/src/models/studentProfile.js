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
        // unique: true
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
    feePayments: {
        Quater1:{ //April May June
            fee_applied:{
                type:Boolean
            },
            isPaid:{
                type:Boolean,
                default: false
            },
            adm_fee:{
                type: Number
            },
            acdm_fee:{
                type: Number
            },
            pending_fee:{
                type: Number
            },
            late_fee:{
                type: Number
            },
            late_fee_ispaid:{
                type:Boolean,
                default: false
            }
        },
        Quater2:{ // July Augest September
            fee_applied:{
                type:Boolean
            },
            isPaid:{
                type:Boolean,
                default: false
            },
            adm_fee:{
                type: Number
            },
            acdm_fee:{
                type: Number
            },
            pending_fee:{
                type: Number
            },
            late_fee:{
                type: Number
            },
            late_fee_ispaid:{
                type:Boolean,
                default: false
            }

        },
        Quater3:{ // October November December
            fee_applied:{
                type:Boolean
            },
            isPaid:{
                type:Boolean,
                default: false
            },
            adm_fee:{
                type: Number
            },
            acdm_fee:{
                type: Number
            },
            pending_fee:{
                type: Number
            },
            late_fee:{
                type: Number
            },
            late_fee_ispaid:{
                type:Boolean,
                default: false
            }

        },
        Quater4:{ // January February March
            fee_applied:{
                type:Boolean
            },
            isPaid:{
                type:Boolean,
                default: false
            },
            adm_fee:{ 
                type: Number
            },
            acdm_fee:{
                type: Number
            },
            pending_fee:{
                type: Number
            },
            late_fee:{
                type: Number
            },
            late_fee_ispaid:{
                type:Boolean,
                default: false
            }

        }
    },
    pending_fees: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Student", studentSchema);