const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const projectSchema = new mongoose.Schema({
    projectId:{
        type: String,
        default: uuidv4,
         unique: true
    },
    name:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type:String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending"
    },
    priority:{
        type: String,
        enum: ["low","medium","high"],
        default: "medium"
    },
    createdBy: {
        type: String,
       required: true
    },
},
  { timestamps: true }
);

const project = mongoose.model("project", projectSchema);
module.exports = project;