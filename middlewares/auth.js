const jwt = require("jsonwebtoken");
require("dotenv").config();

//* Authentication middleware -> check user is authenticated or not
exports.auth = (req, res, next)=>{
    try{
        
         //* Extract token from cookie
         const cookieToken = req.cookies?.token;
        
         //* Extract token from body
         const bodyToken = req.body?.token;
         
         //* Extract token from Authorization header
         const headerToken = req.headers.authorization?.split(' ')[1];
         
         //* Use whichever token is available
         const token = bodyToken || headerToken || cookieToken;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            })
        }
        //* verify token
        try{
            const decodedData = jwt.verify(token, process.env.jwt_secret)
            req.user = decodedData;

        }catch(err){
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            })
        }
        next();
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: " Something went wrong, when verifying the token"
        })
    }
}

//* Authorization middleware -> check user role
exports.isStudent = (req, res, next)=>{
    try{
        if(req.user.role !== "student "){
            return res.status(401).json({
                success: false,
                message: "This is protected route for students"
            })
        }
        next();

    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "User role not matching"
        })
    }
}

exports.isAdmin = (req, res, next)=>{
    try{
        if(req.user.role !== "admin"){
            return res.status(401).json({
                success: false,
                message: "This is protected route for admin"
            })
        }
       next();
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "User role not matching"
        })
    }
}
