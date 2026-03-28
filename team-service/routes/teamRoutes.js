const express = require("express");
const verifyToken = require("../services/jwtverify");
const authorize = require("../services/role");
const teamController = require("../controllers/teamController");

const teamRouter = express.Router();

teamRouter.post("/create-team", verifyToken, authorize("admin"), teamController.createTeam);
teamRouter.get("/viewteams", verifyToken, authorize("admin"), teamController.viewTeams);
teamRouter.post("/assign-team-members", verifyToken, authorize("admin"), teamController.assignTeamMembers);

teamRouter.get("/view-team-members/:teamId", verifyToken, authorize("admin","manager"), teamController.viewTeamMembers);

module.exports = teamRouter;