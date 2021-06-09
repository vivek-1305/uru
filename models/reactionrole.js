const mongoose = require("mongoose");

const reactroleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  messageid: String,
  onlyone: Number,
  emoji: [
    {
      type: String,
    },
  ],
  role: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Reactionrole", reactroleSchema);
