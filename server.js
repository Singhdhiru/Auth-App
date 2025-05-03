const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
app.use(cookieParser(process.env.jwt_secret));

//* middleware
app.use(express.json());

//* connect db
connectDB();

//* mount routes
app.use("/api/v1", userRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})