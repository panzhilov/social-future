const Post = require("../models/Post");
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.COUDINARY_NAME,
    api_key: process.env.COUDINARY_KEY,
    api_secret: process.env.COUDINARY_SECRET
})

async function createPost(req, res) {
    const { content, image } = req.body;

    if(!content.length) {
        return res.json({
            error: "Contentent is required"
        })
    }
    try {
        const post = new Post({content, image, author: req.auth._id});
        post.save();
        res.json(post)
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}


async function imageUpload(req, res){
    try {
        const result = await cloudinary.uploader.upload(req.files.image.path);
        res.json({
            url: result.secure_url, //https
            public_id: result.public_id
        })
    } catch (err) {
        console.log(err);
    }
}

async function postsByUser(req,res){
    
    try {
        // const posts = await Post.find({author: req.auth._id})
        const posts = await Post.find()
        .populate('author', '_id name image')
        .sort({createdAt: -1})
        .limit(10);
    //    console.log(posts);
        res.json(posts);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createPost,
    imageUpload,
    postsByUser
  };