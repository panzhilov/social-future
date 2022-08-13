const { hashPassword } = require("../helpers/authHelper");
const User = require("../models/User");

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
      password: hashedPassword
    });
  
 
    await user.save();
  }


  module.exports = {
    register,
  };
  