require("dotenv").config()

const express = require("express");
const connectDb = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

//routes
app.use("/tasks", taskRoutes);

//Db connection
connectDb();

const port = process.env.PORT || 2003;
app.listen(port, () => {
    console.log(`Task Service running on port ${port}`);
});

