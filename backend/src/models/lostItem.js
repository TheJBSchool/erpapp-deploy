const mongoose = require("mongoose");
const lostItemSchema = new mongoose.Schema({
  itemImg: { type: String, required: true },
  itemDesc: { type: String, required: true },
  imageUrl: { type: String, required: true },
  claimBy: [
    {
      studentId: {type: mongoose.Schema.Types.ObjectId}, // Student Id
      claimMessage: { type: String },
      status: {type:String, default: "Sent"}
    },
  ],
  underBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date_created: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const LostItem = mongoose.model("LostItem", lostItemSchema);

module.exports = LostItem;
