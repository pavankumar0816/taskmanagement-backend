const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const teamSchema = new mongoose.Schema({
    teamId:{
        type: String,
        default: uuidv4,
         unique: true
    },
    teamName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    createdBy: {
       type: String,
       required: true
    },
},
{ timestamps: true }
)

const team = mongoose.model('team', teamSchema);
module.exports = team;