const Project = require("../models/project");
const axios = require("axios");

const createProject = async (req,res) => {
   try
   {   
      const {name, description} = req.body;
       console.log("Name =" + req.body.name);
         if(!name )
         {
             return res.status(400).json({message: "Required fields missing"});
         }
 
         const project = await Project.create({
            name,
            description,
            createdBy: req.user.userId
         });

         res.status(201).json({message: "Project created", data: project});
      
   }
   catch(err)
   {
      console.log(err)
      if (err.code === 11000) {
      return res.status(400).json({message: "Project with this name already exists" });
  }
      res.status(500).json({ message: "Failed to create project" });
   }
}

const viewProjects = async (req, res) => {
   try
   {
      const authUserId = req.user.userId;
      const projects = await Project.find({createdBy: authUserId}, "name description status priority");
      res.json({message: "Projects", data: projects});
   }
   catch(err)
   {
      return res.status(500).json({message: err.message});
   }
}

const getProjectById = async(req, res) => {
   try
   {
      const {projectId} = req.params;

      const project = await Project.findOne({
         projectId: projectId
      });

      if(!project)
      {
         return res.status(404).json({message: "Project not found"});
      }

      res.json({message: "Project Details", data: project});
   }
   catch(err)
   {
       return res.status(500).json({message: err.message});
   }
}

module.exports = {createProject, viewProjects, getProjectById};