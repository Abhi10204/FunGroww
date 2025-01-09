const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
// const async = require("hbs/lib/async");

const home = async(req,res) => {
    try{
        res
            .status(200)
            .send("Welcome to the FunGrow through router");
    } catch (error){
        console.log(error);
    }
};

//User registeration logic
const register = async(req,res)=>{ 
    try{
        console.log(req.body);
        const{username, email, phone, password} = req.body;

        const userExist =await User.findOne({email});
        if(userExist){
            return res.status(400).json({msg: "email already exists"});
        }

        //hash the password methord 1
        // const saltRound = 10;
        // const hash_Password = await bcrypt.hash(password, saltRound);

        const userCreated = await User.create({username, email, phone, password});

        res.status(201).json({msg: "registration successful ", token: await userCreated.generateToken(),userId: userCreated._id.toString()});
    } catch(error){
        res.status(500).json("internal server error");
    }
};


//User Login Logic
const login = async(req,res)=>{
    try {
        const {email,password} = req.body;

        const userExist = await User.findOne({email});
        console.log(userExist);

        if(!userExist){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const user = await bcrypt.compare(password, userExist.password);

        if (user){
            res.status(201).json({message: "Login sucessful", 
            token: await userExist.generateToken(),
            userId: userExist._id.toString()});
        } else{
            res.status(401).json({message: "Invalid email or password"});
        }
    } catch (error) {
        console.error(error);  // Logs the error to help you debug
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

//to send user data - user Logic
// const user = async (req,res) => {
//     try {
//         const userData = req.user;
//         console.log(userData);
//         return res.status(200).json({msg: userData})
//     } catch (error) {
//         console.log("error from the user route", error);
//     }
// };

module.exports = {home,register,login};