const express = require('express');
const {registerUser, loginUser, currentUser, profileUpdate} = require('../controllers/userController');
const {requireSignin}  = require('../middlewares/userMiddleware');



const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/current-user', requireSignin, currentUser)
router.put('/profile-update', requireSignin, profileUpdate)



module.exports = router;