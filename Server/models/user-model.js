const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"], // ✅ fixed
  },
  email: {
    type: String,
    required: [true, "Email is required"], // ✅ fixed
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"], // ✅ fixed
  },
  password: {
    type: String,
    required: [true, "Password is required"], // ✅ fixed
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});


// 🔐 Hash password
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next(); // ✅ important return
  }

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});


// 🔑 JWT Token
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};


// 📦 Model
const User = mongoose.model("User", userSchema);
module.exports = User;