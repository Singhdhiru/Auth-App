const express = require("express");
const router = express.Router();

//* import controller
const { dummyController } = require("../controllers/dummyController");


//* Map api route
router.get("/", dummyController);

//* exporst routes
module.exports = router;