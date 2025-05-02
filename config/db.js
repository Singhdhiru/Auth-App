const mongoose = require("mongoose");
require("dotenv").config();

const mongoDB_URI = process.env.MONGODB_URI;
const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(mongoDB_URI, {});
        console.log(`MongoDB Connected : {conn.connection.host}`);
    }
    catch(err){
        console.error(err);
        process.exit();
    }
};

module.exports = connectDB;