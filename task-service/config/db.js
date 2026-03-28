const mongoose = require("mongoose");

const connectDB = async() => {
    try
    {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb Connected")
    }
    catch(err)
    {
        console.error("DB Connection failed");
        process.exit(1);
    }
}

module.exports = connectDB;