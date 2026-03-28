const Team = require("../models/team");
const TeamMember = require("../models/teamMember")
const axios = require("axios")

const createTeam = async(req,res) => {
   try
   {
        const {teamName, description} = req.body;
        const createdBy = req.user.userId;
        
        if(!teamName || !description)
        {
            return res.status(400).json({message: "Fields were missing"});
        }

        const teams = await Team.create({
            teamName,
            description,
            createdBy
        });

        return res.status(201).json({message: "Team Created",data: teams });
        
   }
   catch(error)
   {
         return res.status(500).json({message: error.message});
   }
}

//admin
const viewTeams = async(req, res) => {
 try
 {
       const teams = await Team.find({}, "teamId teamName createdBy");
       if(teams.length === 0)
       {
          return res.status(400).json({message: "Teams were not exists"}); 
       }
       res.json({message: "Teams", data: teams});
 }
 catch(error)
 {
    return res.status(500).json({message: error.message});
 }
}


const AssignteamMembers = async(req, res) => {
    try
    {
        const {teamId, authId, teamRole} = req.body;
        const authUserId = req.user.userId;
        
        const team = await Team.findOne({
            teamId: teamId,
            createdBy: authUserId,

        })
        if(!team)
        {
            return res.status(400).json({message: "This team not belongs to you"});
        }
        
        const userResponse = await axios.get(`http://localhost:2001/users/${authId}`, {
            headers:{
                Authorization: req.headers.authorization
            }
        })

        const user = userResponse.data;
        if(!user)
        {
            return res.status(404).json({message: "User not found"})
        }

        if(teamRole === "team_member")
        {
            const managerExists = await TeamMember.findOne({
            teamId: teamId,
            authId: user.managerAuthUserId,
            teamRole: "team_manager"
        });
            if(!managerExists)
            {
                return res.status(400).json({message: "Employees manager is not part of this team"});
            }
        }
     
        const alreadyExists = await TeamMember.findOne({teamId, authId});
        if(alreadyExists)
        {
            return res.status(400).json({message: "User already exists in this team"});
        }

        const member = await TeamMember.create({
            teamId,
            authId,
            teamRole
        })
        res.status(201).json({message: "Team Members", data: member});
        
    }
    catch(error)
    {
        return res.status(500).json({message: error.message});
    }
}

const viewTeamMembers = async(req, res) => {
    try
    {
        const team = await Team.findOne({})
        console.log(team.teamName)
        const teamId = team.teamId;

        const teamMembers = await TeamMember.find({teamId: teamId}, "authId teamId teamRole" )
        if(teamMembers.length === 0)
        {
            return res.status(400).json({message: "Team members were not exist"})
        }
        res.json({message: "Team members", data: teamMembers})
    }
    catch(error)
    {
        return res.status(500).json({message: error.message});
    }
}

module.exports = {createTeam, viewTeams, AssignteamMembers, viewTeamMembers};