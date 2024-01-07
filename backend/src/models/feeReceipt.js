const mongoose = require('mongoose');

const feeReceiptSchema = new mongoose.Schema({
  underBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  receiptNo: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  studentClass: {
    type: String,
    required: true
  },
  studentSection: {
    type: String,
    required: true
  },
  session: {
    type: String,
    required: true
  },
  studentRollNo: {
    type: Number,
    required: true
  },
  studentFatherName: {
    type: String,
    required: true
  },
  schoolName:{
    type: String,
    required: true
  },
  quater: {
    type: String,
    required: true
  },
  adm_fee: {
    type: Number,
  },
  acdm_fee: {
    type: Number,
    required: true
  },
  late_fee: {
    type: Number,
    required: true
  },
  totalToBePaid: {
    type: Number,
    required: true
  },
  paymentAmount: {
    type: Number,
    required: true
  },
  remainingAmount: {
    type: Number,
    required: true
  }
});

const FeeReceipt = mongoose.model('FeeReceipt', feeReceiptSchema);

module.exports = FeeReceipt;
