**User Service**

The User Service is a microservice responsible for managing users in the system, including Admins, Managers, and Employees.

It handles user creation and CRUD operations with proper role-based access control.

**Features**
-----------
Create Manager and Employee (Admin only)
View all users (Admin only)
Get user details by Auth ID
Role-based access control
JWT-based authentication integration

🛠️ **Tech Stack**
-----------------
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT (integrated with Auth Service)

🔐 **Authorization Logic**
-------------------------
**Admin**
Can create Managers and Employees
Can view all users

**Manager**
Can view user details (employees)
All routes are protected using JWT verification

📁**Project Structure**
-----------------------
user-service/
│
├── config/              # Database configuration
├── controllers/         # User logic (create, view users)
├── logs/                # app.log, error.log
├── models/              # user.js, counter.js, seedCounter.js
├── routes/              # API routes
├── service/             # jwtverify.js, role.js
├── utils/
│   ├── logger.js        # Logging (Winston)
│   └── sequence.js      # Auto-increment ID generation
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