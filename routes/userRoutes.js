const express = require("express");
const router = express.Router();


//* import controller
const { dummyController } = require("../controllers/dummyController");
const { signup, loginUser } = require("../controllers/Auth");
const { auth, isStudent, isAdmin} = require("../middlewares/auth");


//* Map api route
router.get("/", dummyController);
router.post("/signup", signup);
router.post("/login", loginUser);

//* protected routes
router.get("/test", auth,  (req, res)=>{
    res.json({
        success: true,
        message: "Welcome to Test route!"
    })
})
router.get("/student", auth, isStudent, (req, res)=>{
    res.json({
        success: true,
        message: "Welcome to Student dashboard"
    })
})
router.get("/admin", auth, isAdmin, (req, res)=>{
    res.json({
        success: true,
        message: "Welcome to Admin dashboard"
    })
})

//* exporst routes
module.exports = router;