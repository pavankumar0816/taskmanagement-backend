const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const taskSchema = new mongoose.Schema({
    taskId:{
      type: String,
      default: uuidv4,
      unique: true
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending"
    },
    priority:{
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    projectId:{
        type: String,  
        required: true
    },
    assignTo:{
        type: String,  // UUID
        required: true
    },
    startTime: Date,
    endTime: Date,
    createdBy:{
        type: String,
        required: true
    }
},
 { timestamps: true }
);

const tasks = mongoose.model("task", taskSchema);
module.exports = tasks;