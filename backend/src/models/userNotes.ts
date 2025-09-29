const mongoose = require("mongoose");

const userNotesShcema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model("userNotes", userNotesShcema);
