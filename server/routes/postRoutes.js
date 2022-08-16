const express = require('express');
const formidable = require('express-formidable');

const { createPost, imageUpload } = require('../controllers/postController');

const {requireSignin}  = require('../middlewares/userMiddleware');



const router = express.Router();

router.post('/create-post', requireSignin, createPost)
router.post('/upload-image', requireSignin, formidable({maxFileSize: 5 * 1024 * 1024}), imageUpload)



module.exports = router;