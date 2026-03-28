const Task = require("../models/task");
const axios = require("axios");
const USER_SERVICE = process.env.USER_SERVICE
const PROJECT_SERVICE = process.env.PROJECT_SERVICE

const createTask = async (req,res) => {
  try
  {
    const {name, description,projectId, assignTo, startTime, endTime} = req.body;
    const createdBy = req.user.userId;

    const managerAuthUserId = req.user.userId;

    if(!name || !description || !assignTo)
    {
      return res.status(400).json({message: "Fields were missing"});
    }

    if(startTime && endTime && new Date(startTime) >= new Date(endTime))
    {
      return res.status(400).json({message: "Start time must be before end time"});
    }

    const response = await axios.get(`${USER_SERVICE}/${assignTo}`,{
      headers:{
        Authorization: req.headers.authorization
      }
    })

    const projectResponse = await axios.get(`${PROJECT_SERVICE}/${projectId}`,{
      headers:{
        Authorization: req.headers.authorization
      }
    })
  
    const employee = response.data;
    if(!employee || employee.role !== "employee")
    {
      return res.status(400).json({message: "Invalid employee"});
    }

    if(employee.managerAuthUserId !== managerAuthUserId)
    {
      return res.status(403).json({message: "You can only assign tasks to your employees"});
    }

    const project = projectResponse.data.data;
   if (!project) 
    {
      return res.status(404).json({message: "Project not found"});
    }

    if (project.createdBy !== managerAuthUserId) {
      return res.status(403).json({message: "You cannot create tasks for projects you didn't create"});
    }
     
    const task = await Task.create({
      name,
      description,
      projectId,
      assignTo, 
      startTime,
      endTime,
      createdBy
    });
    return res.status(201).json({message: "Task created", data: task});

  } 
  catch (err) {
    if (err.response) {
      console.error("Error response from task service:", err.response.data);
      return res.status(err.response.status).json({
        message: err.response.data.message
      });
    }

    res.status(500).json({ message: err.message });
  }
}

// employee 
const viewTasksByAuthId = async(req, res) => {
  try
  {
     const authUserId = req.user.userId;
     const tasks = await Task.find({assignTo: authUserId}, "name description startTime endTime priority status");
    if(!tasks)
    {
       return res.status(404).json({message: "No tasks assigned"});
    }
    res.json({message: "Tasks", data: tasks});
  }
  catch(err)
  {
    return res.status(500).json({message: err.message});
  }
}

// employee
const UpdateTasksByEmployee = async (req, res) => {
  try
  {
      const {taskId, status} = req.body;
      const EmployeeId = req.user.userId;

      const task = await Task.findById(taskId);
      if(!task)
      {
        return res.status(404).json({message: "Task not found"});
      }

      if(task.assignTo !== EmployeeId)
      {
        return res.status(403).json({message: "You can update only your assigned tasks"});
      }
      task.status = status;
      await task.save();
      return res.status(200).json({message: "Task Updated"});
  }
  catch(err)
  {
    return res.status(500).json({message: err.message});
  }
}

const viewTasks = async (req, res) => {
  try
  {
      const authUserId = req.user.userId;
      const role = req.user.role;

      let query = {};
      if(role === "employee")
      {
        query.assignTo = authUserId;
      }
      else if(role === "admin")
      {
        query = {}
      }

      const task = await Task.find(query).select("name description startTime endTime priority status")

      res.json({message: "Tasks", data: task});
  }
  catch(err)
  {
     res.status(500).json({message: "Failed to fetch tasks"});
  }
}

module.exports = {createTask, viewTasksByAuthId, UpdateTasksByEmployee, viewTasks};