const mongoose = require("mongoose");
const { Schema } = mongoose;

const postsSchema = Schema({
  id: { type: Number, required: true },
});

module.exports = mongoose.model("Post", postsSchema);
