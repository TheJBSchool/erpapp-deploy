const mongoose = require('mongoose');

const feeReqSchema = new mongoose.Schema({
    type: {
        type: String, // feeApproval, feeUnlock
        default: "feeApproval",
        required: true
    },
    adminId:{
        type: mongoose.Types.ObjectId,
        required:true
    },
    session:{
        type:String,
        required: true
    },
    date_created: {
        type: Date,
        required: true,
        default: Date.now
    },
    data:[{
        type: Object,
        required: true
    }],
    status: {
        type: String,
        required: true,
        default: "Sent"
    }

});

module.exports = mongoose.model("FeeReq", feeReqSchema);