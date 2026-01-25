const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync");
const passport=require("passport");
const{saveRedirectUrl}=require("../middleware.js");
const userController=require("../controllers/user.js");


//signUP
router.route("/signUp")
.get(userController.rendersignUpForm)
.post(wrapAsync(userController.signUp))
 

// Login
router.route("/login")
.get(userController.renderLoginForm)
.post(
  saveRedirectUrl,
  (req, res, next) => {
    if (req.body.username) {
      req.body.username = req.body.username.trim();
    }
    next();
  },
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),

  userController.login
);


//logout
router.get("/logout",userController.logOut);

module.exports=router;