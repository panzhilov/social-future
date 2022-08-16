const express = require('express');
const {registerUser, loginUser, currentUser} = require('../controllers/userController');
const {requireSignin}  = require('../middlewares/userMiddleware');



const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/current-user', requireSignin, currentUser)



module.exports = router;