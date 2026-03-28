module.exports = (...allowedRoles) => {
    return (req,res,next) => {
        if(!allowedRoles.includes(req.user.role))
        {
            return res.status(403).json({message: "You are not having access"})
        }
        next();
    };
}