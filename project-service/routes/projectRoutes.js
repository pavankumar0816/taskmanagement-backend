 const express = require("express");
 const verifyToken = require("../service/jwtverify");
 const projectcontroller = require("../controller/projectController")
 const authorizeRoles = require("../service/role")

 const projectRouter = express.Router();

 projectRouter.post("/create-project", verifyToken, authorizeRoles("manager"), projectcontroller.createProject);
 projectRouter.get("/view-projects", verifyToken, authorizeRoles("manager", "admin"), projectcontroller.viewProjects)
 projectRouter.get("/:projectId", verifyToken, authorizeRoles("manager", "admin"), projectcontroller.getProjectById)

 module.exports=projectRouter;
 