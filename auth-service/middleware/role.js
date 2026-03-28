const logger = require("../utils/logger");

module.exports = (...allowedRoles) => {
    return (req,res,next) => {
        if(!allowedRoles.includes(req.user.role)){
            logger.error("You are not having access, Please contact to Admin")
            return res.status(403).json({message: "Access denied" });
        }
        next();
    };
};