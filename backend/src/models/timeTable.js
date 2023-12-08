const mongoose = require('mongoose');

const ClassTimetableSchema = new mongoose.Schema({
    day:String,
    startTime: String,
    endTime: String,
    type: String,
    teacher: String,
    subject: String
});


const TimetableSchema = new mongoose.Schema({
    class: {
        type: String,
        required: true
    },
    table: [[ClassTimetableSchema]] 
});

const Timetable = mongoose.model('Timetable', TimetableSchema);

module.exports = Timetable;
