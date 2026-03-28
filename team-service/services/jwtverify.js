const jwt = require("jsonwebtoken");

const verifyToken = (req,res, next) => {
    try
    {
        const header = req.headers.authorization;
        if(!header)
        {
            return res.status(401).json({message: "No Token"});
        }

        const token = header.split(" ")[1];
        const verify = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verify;
        next();

    }
    catch(err)
    {
         return res.status(401).json({message: "Invalid Token"});
    }
}

module.exports = verifyToken;