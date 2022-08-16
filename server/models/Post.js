const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: {
    required: true,
    type: {},
  },
  image: {
    url: String,
    public_id: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      commentAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
