require("dotenv").config();
const mongoose = require("mongoose");
// const URI = "mongodb://127.0.0.1:27017/Admin";
const URI = process.env.MONGODB_URI
const connectDB = async() => {
    try {
        await mongoose.connect(URI);
        console.log("Connection sucessfull to DB");
    } catch (error) {
        console.error("DB connection failed",error);
        process.exit(0);
    }
};

module.exports = connectDB;