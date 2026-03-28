const {verifyToken} = require("../services/jwtservice");
const logger = require("../utils/logger");

//next() does not search, It simply moves to the next function defined in route.
const verifyTokens = (req, res, next) => {
    try{
        const header = req.headers.authorization;

        if(!header){
            logger.error("Authorization header missing");
            return res.status(401).json({message: "No Token"});
        }

        const token = header.split(" ")[1];
        const decoded = verifyToken(token);

        req.user = decoded; 
        next();
    }
    catch(err)
    {
       return res.status(401).json({message: "Invalid Token" });
    }
};

module.exports= verifyTokens