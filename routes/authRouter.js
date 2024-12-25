const {Router} = require("express");
const authController = require("../controllers/authController");

const router = Router();


//Get
router.get("/", authController.displayIndex)
router.get("/sign-up", authController.signUpGet);
router.get("/log-in", authController.logInGet);


//Post
router.post("/log-in", authController.logInPost);
router.post("/sign-up", authController.signUpPost);





module.exports = router;
