const Post = require("../models/Post");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.COUDINARY_NAME,
  api_key: process.env.COUDINARY_KEY,
  api_secret: process.env.COUDINARY_SECRET,
});

async function createPost(req, res) {
  const { content, image } = req.body;

  if (!content.length) {
    return res.json({
      error: "Contentent is required",
    });
  }
  try {
    const post = new Post({ content, image, author: req.auth._id });
    post.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

async function imageUpload(req, res) {
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);
    res.json({
      url: result.secure_url, //https
      public_id: result.public_id,
    });
  } catch (err) {
    console.log(err);
  }
}

async function postsByUser(req, res) {
  try {
    // const posts = await Post.find({author: req.auth._id})
    const posts = await Post.find()
      .populate("author", "_id name image")
      .sort({ createdAt: -1 })
      .limit(10);
    //    console.log(posts);
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
}

async function userPost(req, res) {
  try {
    const post = await Post.findById(req.params._id);
    res.json(post);
  } catch (err) {
    console.log(err);
  }
}

async function updatePost(req, res) {
  //    console.log('post update controle', req.body)

  try {
    const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });
    res.json(post);
  } catch (err) {
    console.log(err);
  }
}

async function deletePost(req, res) {
    try {
        const post = await Post.findByIdAndDelete(req.params._id);

        //remove the image from clodinary
        if(post.image && post.image.public_id) {
            const image = await cloudinary.uploader.destroy(post.image.public_id);
        }
        res.json({ok: true})
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
  createPost,
  imageUpload,
  postsByUser,
  userPost,
  updatePost,
  deletePost
};
