const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  joinedUsers: {
    type: Array,
    require: true,
  },
  joinedUserNumber: {
    type: Number,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdBy: {
    type: String,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sport: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  playersNeeded: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Post", PostSchema);
