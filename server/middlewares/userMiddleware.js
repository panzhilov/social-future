const Post = require("../models/Post");

const expressJwt = require('express-jwt');

const requireSignin = expressJwt.expressjwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"] 
});

async function canEditDeletePost(req, res, next){
    try {
        const post = await Post.findById(req.params._id)
        if(req.auth._id != post.author){
            res.status(400).send("Unauthorized")
        } else{
            next();
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    requireSignin,
    canEditDeletePost
}