const User = require("../models/user");
const logger = require("../utils/logger");
const { hashPassword } = require("./passwordservice");


const seedAdmin = async () => {
    try{
        const admin = await User.findOne({role: 'admin'});

        if(admin){
            logger.info("Admin already exists");
            return;
        }
        const hash = await hashPassword("Admin@123")

        await User.create({
            
            name: "Admin",
            email: "admin@gmail.com",
            password: hash,
            role: "admin"
        });
      logger.info("Admin Created");
    }
    catch(err)
    {
        logger.info("Admin seed failed");
    }
}

module.exports=seedAdmin;