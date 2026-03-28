## Task Management Backend
The Task Management Backend is a microservices-based application designed to manage users, projects, tasks, and teams efficiently.

The system is divided into 5 independent microservices, where each service handles its own functionality, APIs, and database.

## Microservices Overview
🔐 **Auth Service**
Handles authentication, JWT token generation, and security<br> 

👥 **User Service**
Manages users (Admin, Manager, Employee) and their data<br>

📁 **Project Service**
Handles project creation and management<br>

📝 **Task Service**
Manages task creation, updates, and assignment<br>

👨‍👩‍👧‍👦 **Team Service**
Handles team creation and assigning members<br>

## User Roles
- **Admin:** Creates Managers and Employees , Manages teams
- **Manager:** Creates projects and tasks , Manages assigned employees
- **Employee:** Views and updates assigned tasks

## 🛠️ Tech Stack
- Backend: Node.js, Express.js 
- Database: MongoDB (separate DB per service)
- Authentication: JWT
- Logging: Winston
- Request Logging: Morgan

 ## 🔐 Security & Architecture
RBAC (Role-Based Access Control) implemented across all services
JWT Authentication for secure communication<br>
Each service:  
- Has its own APIs
- Has its own database
- Runs independently

## Inter-Service Communication
Services communicate via REST APIs (Axios)<br>
Example:<br>
Task Service → User Service (validate employee)<br>
Task Service → Project Service (validate project)<br>
Team Service → User Service (validate members)<br>
JWT token is shared across services for authentication<br>

## 📁 Project Structure
```
taskmanagement-backend/
│
├── auth-service/
├── user-service/
├── project-service/
├── task-service/
├── team-service/
│
└── README.md
```

## Key Highlights
- Microservices architecture
- Scalable and modular design
- Secure authentication and authorization
- Real-time validation using inter-service API calls
- Clean separation of concerns

**This project demonstrates:**
- Real-world microservices architecture
- Secure backend development using JWT & RBAC
- Proper service-to-service communication
- Scalable and maintainable system design

## Architecture Diagram
```
                ┌──────────────────────┐
                │      Client (UI)     │
                └─────────┬────────────┘
                          │
                          ▼
                ┌──────────────────────┐
                │     Auth Service     │
                │  (JWT Authentication)│
                └─────────┬────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│ User Service  │  │ Project Service│ │  Team Service  │
│ (Users Data)  │  │ (Projects)     │ │ (Teams)        │
└───────────────┘  └───────────────┘  └───────────────┘
                          │
                          ▼
                ┌──────────────────────┐
                │    Task Service      │
                │ (Tasks Management)   │
                └──────────────────────┘
```
                