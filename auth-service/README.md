🔐 **Auth Service: Acts as the security layer of the application**

The Auth Service is one of the core microservices in the Task Management Project. It is responsible for handling user authentication, authorization, and secure token generation using JWT.

**Features**
------------
User authentication (login & validation)
Secure password hashing using bcrypt
JWT token generation and verification
Default admin creation on service startup
Request logging and application logging
CORS enabled for cross-origin requests

🛠️ **Tech Stack**
------------------
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JSON Web Token (JWT)
Password Hashing: bcryptjs
Logging: Winston
Request Logging: Morgan

**JWT Authentication**
-----------------------
JWT is used to generate secure tokens after successful login.
These tokens are used to authenticate protected routes.
Tokens are typically sent in headers (Authorization: Bearer <token>).

**Default Admin Seeding**
--------------------------
When the Auth Service starts, a default admin user is automatically created (if not already present).

**Middleware Used**
-------------------
1. CORS
Enables cross-origin requests
Allows frontend and backend to communicate securely
2. Morgan
Logs HTTP request details in the console
Useful for debugging API calls
3. Winston
Used for structured logging
Maintains:
Application logs
Error logs

📁 **Project Structure**
-------------------------

auth-service/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── authController.js
│
├── logs/
│   ├── app.log
│   └── error.log
│
├── middleware/
│   ├── auth.js
│   └── role.js
│
├── models/
│   └── user.js
│
├── routes/
│   └── authRoutes.js
│
├── services/
│   ├── jwtservice.js
│   ├── passwordservice.js
│   └── seedAdmin.js
│
├── utils/
│   └── logger.js
│
├── server.js
└── README.md

**How to Run**

Install dependencies:
npm install

Add environment variables (.env):
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

**Start the service:**
npm start