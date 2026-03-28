require("dotenv").config()

const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const connectDB = require("./config/db")
const projectRoutes = require("./routes/projectRoutes")


const app = express()

//security header
app.use(helmet())

// request logging: It prints HTTP request details.
app.use(morgan("dev"))

// body parser
app.use(express.json())

//routes
app.use("/projects", projectRoutes)

//DB Connection
connectDB();

const port = process.env.PORT || 2001;
app.listen(port, () => {
    console.log(`User Service running on ${port}`);
});
