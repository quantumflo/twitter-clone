const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true },
  tweet: { type: String, required: true },
  likes: { type: Number },
  createdDate: { type: Date, required: true },
});

module.exports = mongoose.model("Tweet", tweetSchema);
