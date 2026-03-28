const express = require("express");
const verifyToken = require("../service/jwtverify");
const authorize = require("../service/role")
const usercontroller = require("../controllers/userController")

const userRouter = express.Router();

userRouter.post("/create-manager", verifyToken, authorize("admin") , usercontroller.createManager);
userRouter.post("/create-employee", verifyToken, authorize("admin") , usercontroller.createEmployee);
userRouter.get("/view-users", verifyToken,  authorize("admin"), usercontroller.viewUsers);
userRouter.get("/:authUserId", verifyToken, authorize("admin", "manager"),usercontroller.getUserByAuthId);

module.exports=userRouter;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWJkNWM0My03NGY0LTRjMTMtYTgzMi1kN2ExNTU2ZTFiZjEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NzI0MzExMDAsImV4cCI6MTc3MjQzNDcwMH0.4N-P2fNmQtMfSGnaJH7-U9IGIbcuzBPaN0jbmsfUzM4