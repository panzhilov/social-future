const express = require("express");
const formidable = require("express-formidable");

const {
  createPost,
  imageUpload,
  postsByUser,
  userPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  removeComment,
  
} = require("../controllers/postController");
const {
  requireSignin,
  canEditDeletePost,
} = require("../middlewares/userMiddleware");

const router = express.Router();

router.post("/create-post", requireSignin, createPost);
router.post(
  "/upload-image",
  requireSignin,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  imageUpload
);
router.get("/user-posts", requireSignin, postsByUser);
router.get("/user-post/:_id", requireSignin, userPost);
router.put("/update-post/:_id", requireSignin, canEditDeletePost, updatePost);
router.delete(
  "/delete-post/:_id",
  requireSignin,
  canEditDeletePost,
  deletePost
);
router.put("/like-post", requireSignin, likePost);
router.put("/unlike-post", requireSignin, unlikePost);
router.put('/add-comment', requireSignin, addComment)
router.put('/remove-comment', requireSignin, removeComment)


module.exports = router;
