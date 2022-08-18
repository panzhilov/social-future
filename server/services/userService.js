const { hashPassword } = require("../helpers/authHelper");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const uniqid = require('uniqid');

async function register(name, email, password) {
     const existingEmail = await User.findOne({
      email: new RegExp(`^${email}$`, "i"),
    });
  
    if (existingEmail) {
      throw new Error("This email is already used");
    }

    const hashedPassword = await hashPassword(password)
  
    const user = new User({
      name,
      email,
      password: hashedPassword,
      username: uniqid()
    });
  
 
    await user.save();
  }


  async function createToken(user){

    const payload = {
          _id: user._id,
        };
  
    const token = jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: "2h",
      }
    );
  
    return token;
  }

  module.exports = {
    register,
    createToken,
  };
  