// const jwt = require("jsonwebtoken");
// const User = require("../models/user-model");

// const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ error: "Authentication token is required" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const user = await User.findById(decoded.userId);
//     if (!user) {
//       return res.status(401).json({ error: "User not found" });
//     }

//     req.user = { userId: decoded.userId, isAdmin: decoded.isAdmin };
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ error: "Invalid or expired token" });
//   }
// };

// module.exports = authMiddleware;
