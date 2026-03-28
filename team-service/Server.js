require("dotenv").config()

const express = require("express")
const connectDB = require("./config/db")
const teamRoutes = require("./routes/teamRoutes")


const app = express()

app.use(express.json())


app.use("/teams", teamRoutes)

//DB Connection
connectDB()

const port = process.env.PORT || 2004;
app.listen(port, () => {
    console.log(`Team Service running on ${port}`);
});