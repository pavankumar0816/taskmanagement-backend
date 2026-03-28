const User = require("../models/user");
const {hashPassword, comparePassword} = require("../services/passwordservice");
const {generateToken} = require("../services/jwtservice");
const logger = require("../utils/logger");
const { v4: uuidv4 } = require('uuid');

const userRegister = async (req, res) => {
    try
    {
        const {name, email, password, role} = req.body;

        const exists = await User.findOne({email});
        if(exists)
        {
            return res.status(400).json({message:"Email Already Registered"});
        }

        const hashed = await hashPassword(password);

        const user = await User.create({
            name,
            email,
            password: hashed,
            role,
            userId: uuidv4()
        });

        logger.info(`User Registered ${email}`)
        return res.status(201).json({
            message: "User Registered",
            userId: user.userId 
        })
    }
    catch(err)
    {
        logger.error(err.message);
        res.status(500).json({ message: "Registration failed" });
    }
}


const userLogin = async (req,res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "User not found"});

        const match = await comparePassword(password, user.password);
        if(!match) return res.status(400).json({message: "Invalid password"});

        const token = generateToken(user);

        logger.info(`Login Success: ${email}`);

        res.json({token, role: user.role});
    }
    catch(err)
    {
        logger.error(err.message);
        res.status(500).json({message: "Login Failed"});
    }
};

const myProfile =async (req,res) => {
    const user = await User.findOne({userId: req.user.userId }).select("-password");
    res.json(user);
};
     
const updatePassword = async (req, res) => {
   try
   {
        const {password} = req.body;
        if(!password)
            {
                return res.status(400).json({message: "Password is required"});
            } 

        const authUserId = req.user.userId;
        const user = await User.findOne({ userId: authUserId}).select("password");
        if(!user)
        {
            return res.status(404).json({ message: "User not found" });
        }
         const isSame = await comparePassword(password, user.password);
        if(isSame)
        {
            return res.status(400).json({message: "New password cannot be same as old passowrd"});
        }    
            

        const hashpassword = await hashPassword(password);
        user.password = hashpassword;
        await user.save();
        
        res.json({message: "Password Updated"});
   }
   catch(err)
   {
        console.log(err.message);
        res.status(500).json({message: "Password update failed"});
   }
}

module.exports= {userRegister, userLogin, myProfile, updatePassword};