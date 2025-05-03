const mongoose = require("mongoose");
const user = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

exports.signup = async(req, res)=>{
    try{
        //* extract the data from req body
        const {name, email, password,role} = req.body;

        //* check if emial already exists
        const userExists = await user.findOne({email});
        if(userExists){
            return res.status(400).json({
                Message: "User already exists",
                success: false
            })
        }
        if(!name || !email || !password){
            return res.status(400).json({
                Message: "Please fill all the fields",
                success: false
            })
        }
        
        //* hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //* create the user
        const newUser = await user.create({
            name,
            email,
            password: hashedPassword,
            role
        })

        res.status(200).json({
            message: "User created Succesfully",
            success: true
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            Message: "User can not be register, please try agin later",
            success: false,
            error: err
        })
    }
}

//* login Controller
exports.loginUser = async(req, res)=>{
    try{
        //* extract the data from req body
        const {email, password} = req.body;
        //* check valid email and password
        if(!email || !password){
            return res.status(400).json({
                message: "Please fill all the fields",
                success: false
            })
        }
        //* check if user exists
        const userExists = await user.findOne({email});
        if(!userExists){
            return res.status(401).json({
                success: false,
                message: "User does not exists"
            })
        }
        //* create payload
        const payload = {
            email: userExists.email,
            id: userExists._id,
            role: userExists.role
        }
        //* verify password and create token
        if(await bcrypt.compare(password, userExists.password)){
            let token = jwt.sign(payload, process.env.jwt_secret, {
                expiresIn: "2h"
            });
            //* we are add token in user object
            //TODO: user.token is not insert in existing user
            userExists.token = token;
            //* remove password from user object before sending response
            userExists.password = undefined;
            //* create option
            let options = {
                expries: new Date(Date.now()+ 3*24*60*60*1000), //* would expire after 3days
                httpOnly: true, //* The cookie only accessible by the web server
                signed: true //* Indicates if the cookie should be signed
            }
            //* create cookie
            res.cookie("token", token, options);
            //* send response
            res.status(200).json({
                success: true,
                token,
                userExists,
                message: "Login Successfully"
            })

        }
        else{
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            sucess: false,
            message: "Internal Server Error",
            error: err
        })
    }
}