**Team Service**
The Team Service is a microservice responsible for managing teams and assigning members (Managers and Employees) to teams.

**Features**
-----------
Create teams (Admin only)
View all teams (Admin only)
Assign team members (Admin only)
View team members (Admin & Manager)
Role-based access control
JWT-based authentication integration

🛠️ **Tech Stack**
-----------------
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT (integrated with Auth Service)


🔐 **Authorization Logic**
-------------------------
Admin
Can create teams
Can assign members to teams
Can view teams
Manager
Can view team members
All routes are protected using JWT verification

**Inter-Service Communication**
------------------------------
Calls **User Service** to:
Verify user exists
Get user role and manager details
Ensures:
Only valid users are added to teams
Employee’s manager is part of the same team
JWT token is forwarded for secure communication

**Core Responsibilities**
------------------------
Manage team creation
Assign users (manager/employee) to teams
Maintain team-member relationships
Validate data using other services

📁 **Project Structure**
------------------------
team-service/
│
├── config/              # Database configuration
├── controllers/         # Team logic
├── models/
│   ├── team.js          # Team schema
│   └── teamMember.js    # Maps users to teams with roles (team_manager, team_member)
│
├── routes/
│   └── teamRoutes.js
│
├── services/
│   ├── jwtverify.js     # JWT verification
│   └── role.js          # Role-based authorization
│
├── server.js
└── README.md


**How to Run**

Install dependencies:
npm install

Add environment variables (.env):
PORT=5001
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

**Start the service:**
npm start