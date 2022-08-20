const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      required: true,
      type: {},
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
