const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
    class: {
        type: String,
        required: true
    },
    // section: {
    //     type: String,
    //     required: true
    // },
    session:{
        type: String,
        default: "2023-24",
        required: true
    },
    adm_fee: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value>0 && /\d/.test(value);
            }
        }
    },
    academic_fee: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value>0 && /\d/.test(value);
            }
        }
    },
    late_fee: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value>0 && /\d/.test(value);
            }
        }
    },
    // mode: {
    //     type: String,
    //     required: true,
    //     enum: ["Anually", "Half-yearly", "Quaterly", "Monthly"]
    // },
    date1: {
        type: Date,
        required: true,
    },
    date2: {
        type: Date,
        required: true,
    },
    date3: {
        type: Date,
        required: true,
    },
    date4: {
        type: Date,
        required: true,
    },
    late_fee_x: {
        type: Number,
    },
    underBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

});

module.exports = mongoose.model("Fee", feeSchema);