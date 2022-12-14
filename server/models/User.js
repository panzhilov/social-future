const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 16,
  },
  username: {
  type: String,
  unique: true,
  required: true
  },
  about: {},
  photo: String,
  following: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  followers: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
});



  userSchema.index(
    { email: 1 },
    {
      collation: {
        locale: "en",
        strength: 1,
      },
    }
  );
  


const User = mongoose.model("User", userSchema);

module.exports = User;
