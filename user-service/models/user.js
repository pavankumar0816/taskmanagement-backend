const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    authUserId:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    role:{
        type: String,
        enum: ["manager","employee"],
        required:true
    },
    managerAuthUserId: {
    type: String,   // store manager's authUserId
    default: null,
    required: function () {
   return this.role === "employee";
 }
  },
    managerId:{
        type:Number,
        default:null
    },

    employeeId:{
        type:Number,
        default:null
    },
    createdBy:{
       type:String,
       required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }

)

const user = mongoose.model("user", userSchema)
module.exports=user;