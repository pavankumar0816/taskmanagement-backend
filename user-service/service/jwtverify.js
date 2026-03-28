const jwt = require("jsonwebtoken")
const logger = require("../utils/logger");
const verifyToken = (req, res, next) => {
  try
  {
    const header = req.headers.authorization;
     
    if(!header)
    {
        logger.error("Authorization header missing");
        return res.status(401).json({message:"No Token"});
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // {id : uuid}
    next();

  }
  catch(err)
  {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;