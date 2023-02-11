const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", usersSchema);
