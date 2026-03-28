## 📁Project Service
The **Project Service** is a dedicated microservice in the **Task Management System** responsible for managing project-related operations.

It primarily handles project creation and retrieval, ensuring that only authorized users (Managers) can create projects.

## Features
- Create new projects (restricted to managers)
- View existing projects
- Role-based access control
- JWT-based authentication integration
- Modular and scalable microservice design

## 🛠️ Tech Stack
**Backend**: Node.js, Express.js<br>
**Database**: MongoDB<br>
**Authentication**: JWT (integrated with Auth Service)<br>

## Authorization Logic
Only users with the Manager role are allowed to create projects<br>
All project-related operations are protected using JWT verification<br>
Role-based access ensures proper permission handling<br>

## 📁 Project Structure 
------------------------
```
project-service/
│
├── config/
│   └── db.js
│
├── controller/
│   └── projectController.js
│
├── models/
│   └── project.js
│
├── routes/
│   └── projectRoutes.js
│
├── service/
│   ├── jwtverify.js
│   └── role.js
│
├── server.js
└── README.md
```

## Core Responsibilities
- Handle project creation requests
- Validate user role before allowing creation
- Store and manage project data in MongoDB
- Provide APIs to fetch project details

## Integration with Auth Service
This service depends on the Auth Service for:<br>
- Token generation
- User authentication
JWT tokens issued by Auth Service are verified here before granting access

## How to Run

Install dependencies:
npm install<br>

Add environment variables (.env):<br>
- PORT=5000
- MONGO_URI=your_mongodb_connection
- JWT_SECRET=your_secret_key<br>

**Start the service:**<br>
npm start