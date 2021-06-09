const mongoose = require("mongoose");

const bumpSchema = mongoose.Schema({
  id: String,
  name: String,
  bumps: Number,
  reminder: Number,
});

module.exports = mongoose.model("bump", bumpSchema);
