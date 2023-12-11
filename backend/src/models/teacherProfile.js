const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true
    },
    class: [{
        type: String,    
        required: true,
    }],
    class_teacher: {
        type: String
    },
    group: {
        type: String,   
        required: true,
        enum: ["Pre", "Primary", "Secondary"]
    },
    teaching_subject:[{
        type:String
    }],
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
    joining_date: {
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
    underBy:{
        type: mongoose.ObjectId
    }
});

module.exports = mongoose.model("Teacher", teacherSchema);