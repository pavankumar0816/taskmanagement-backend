const mongoose = require("mongoose")
const { v4: uuidv4 } = require("uuid"); // UUID = Universally Unique Identifier, A value that is unique everywhere across servers,databases,countries,time

const userSchema = new mongoose.Schema({
     userId: {
        type: String,
        default: uuidv4,
        unique: true
    },
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "manager", "employee"],
        required:true
    },
    isActive: {type: Boolean, default: true},
    },
    {timestamps: true}
);

const user = mongoose.model("user", userSchema);
module.exports = user;