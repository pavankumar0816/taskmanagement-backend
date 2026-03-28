const User = require("../models/user");
const getNextSequence = require("../utils/sequence");
const logger = require("../utils/logger");
const axios = require("axios");
const AUTH_SERVICE = process.env.AUTH_SERVICE

const createManager =async (req,res) => {
 try
 {
    const {name, email, role}= req.body;
    const createdBy = req.user.userId;

    if (role !== "manager") {
        return res.status(400).json({ message: "Role must be manager" });
    }
    
    const existingUser = await User.findOne({email});
    if(existingUser)
    {
        return res.status(400).json({message: "Email Already exists"});
    }

    const generatedPassword = "Manager@123";
    const response = await axios.post(`${AUTH_SERVICE}/register`, {
      name,
      email,
      password:generatedPassword,
      role
    });

    if (!response.data.userId) {
      return res.status(500).json({ message: "Auth service failed" });
    }

    const authUserId = response.data.userId;
    const managerId = await getNextSequence("manager");
   
    const manager = await User.create({
        authUserId,
        name,
        email,
        role,
        managerId,
        createdBy
    });

    logger.info("Manager Created in User Service database");
    res.status(201).json({
        message: "Manager Created",
        data: manager
    });
    
 }
 catch(err)
 {
     logger.error(err.message);
    res.status(500).json({ message: "Failed to create Manager" });
 }
}

const createEmployee = async (req,res) => {
    try
    {
        const {name,email,role, managerAuthUserId} = req.body;
         const createdBy = req.user.userId;

        if(role !== "employee")
        {
            return res.status(400).json({message: "Role must be employee"});
        }

        const existingUser = await User.findOne({email});

        if(existingUser)
        {
            return res.status(400).json({message: "Email already exists"});
        }

        const checkManager = await User.findOne({
            authUserId: managerAuthUserId,
            role: "manager"
        });
        
        if(!checkManager)
        {
            return res.status(400).json({message: "Invalid manager"});
        }
        const tempPassword = "Employee@123";
        const response = await axios.post(`${AUTH_SERVICE}/register`, {
            name,
            email,
            password:tempPassword,
            role
        })
        if(!response.data.userId)
        {
            return res.status(500).json({message: "Auth service failed"});
        }

        const authUserId = response.data.userId;
        const employeeId = await getNextSequence("employee");

        const employee = await User.create({
            authUserId,
            name,
            email,
            role,
            managerAuthUserId,
            employeeId,
            createdBy
        });

        res.status(201).json({message: "Employee created", data: employee});

    }
     catch(err)
    {
        res.status(500).json({ message: "Failed to create Employee" });
    }
}

const viewUsers = async (req,res) => {
  try
  {
    const {role} = req.query;

    const filter = {};

    if(role)
    {
        filter.role = role;
    }

    const users = await User.find(
        filter,
        "name  email role managerId employeeId createdBy"
    );

    if(users.length === 0)
    {
        return res.status(404).json({message: "No users found"});
    }

    res.json(users);
  }
  catch(err)
  {
     res.status(500).json({message: err.message});
  }
}

const getUserByAuthId = async(req, res) => {
    try
    {

        const { authUserId } = req.params;
         console.log(req.params);

        const user = await User.findOne({authUserId}, "authUserId name email role managerAuthUserId");

        if(!user)
        {
            return res.status(404).json({message: "User not found"});
        }
       
        res.json(user);
    }
    catch(err)
    {
         res.status(500).json({ message: err.message });
    }
}




module.exports= {createManager,createEmployee, viewUsers, getUserByAuthId};