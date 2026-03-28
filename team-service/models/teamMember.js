const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const teamMemberSchema = new mongoose.Schema({
    teamMemberId:{
        type: String,
        default: uuidv4,
        unique: true
    },
    teamId: {
        type: String,
        required: true
    },
    authId:{
        type: String,
        required: true
    },
    teamRole: {
        type: String,
        enum: ["team_manager", "team_member"]
    },
    joinedAt:{
        type: Date,
        default: Date.now
    }
},
{ timestamps: true }
)
teamMemberSchema.index({ teamId: 1, authId: 1 }, { unique: true });

const teamMember = mongoose.model("teammember", teamMemberSchema);
module.exports = teamMember;
