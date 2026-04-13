const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

// Home
const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to FunGrow API");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= REGISTER =================
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // check existing user
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // create user
    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    res.status(201).json({
      message: "Registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ================= LOGIN =================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    // ❌ user not found
    if (!userExist) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // ❌ wrong password
    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // ✅ success
    res.status(200).json({
      message: "Login successful",
      token: await userExist.generateToken(),
      userId: userExist._id.toString(),
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { home, register, login };