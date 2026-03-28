require("dotenv").config()

const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const seedAdmin = require("./services/seedAdmin")
const cors = require("cors")

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
app.use("/auth", authRoutes)

//DB Connection
connectDB().then(() => {
    seedAdmin();
});

const port = process.env.PORT || 2026;
app.listen(port, () => {
    console.log(`Auth Service running on ${port}`);
});