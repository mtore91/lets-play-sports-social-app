const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  image: {
    type: String,
    require: false
  },
  joinedUsers: {
    type: Array,
    require: true,
  }, joinedUserIds: {
    type: Array,
    require: true,
  },
  joinedUserNumber: {
    type: Number,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: false,
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
  playersNeeded: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Post", PostSchema);
