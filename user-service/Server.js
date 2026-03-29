require("dotenv").config()

const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const connectDB = require("./configs/db")
const userRoutes = require("./routes/userRoutes")
const seedCounter = require("./models/seedCounters")
const cors = require("cors");

const app = express()
app.use(cors({
    origin: "http://localhost:5173"
}))

//security header
app.use(helmet())

// request logging: It prints HTTP request details.
app.use(morgan("dev"))

// body parser
app.use(express.json())

//routes
app.use("/users", userRoutes)

//DB Connection
connectDB().then(() => {
    seedCounter();
});

const port = process.env.PORT || 2001;
app.listen(port, () => {
    console.log(`User Service running on ${port}`);
});


 
// const os = require('os');
// const path = require('path');

// console.log(os.type());
// console.log(os.version())
// console.log(os.homedir())
// console.log(__dirname)
// console.log(__filename)

// console.log(path.dirname(__filename))