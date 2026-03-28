// const router = require("express").Router();

const express = require("express")
const userrouter = express.Router();
const authorize = require("../middleware/role")
const authcontroller = require("../controllers/authController");
const auth = require("../middleware/auth");

userrouter.post("/register", authcontroller.userRegister)

userrouter.post("/login", authcontroller.userLogin);

userrouter.get("/me", auth, authorize("admin"), authcontroller.myProfile);

userrouter.put("/update-password", auth, authorize(["admin", "employee", "manager"]), authcontroller.updatePassword);

module.exports= userrouter;
