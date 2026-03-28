const express = require("express");
const verifyToken = require("../services/jwtverify");
const authorize = require("../services/role");
const taskController = require("../controllers/taskController");

const taskRouter = express.Router();

taskRouter.post("/create-task", verifyToken, authorize("manager"), taskController.createTask);
taskRouter.get("/viewTasksByAuthId", verifyToken, authorize("employee"), taskController.viewTasksByAuthId);
taskRouter.put("/update-task", verifyToken, authorize("employee"), taskController.UpdateTasksByEmployee);
taskRouter.get("/view-tasks", verifyToken, authorize("employee", "admin", "manager"), taskController.viewTasks);

module.exports = taskRouter;