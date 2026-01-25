const User=require("../models/user.js")


//signUp
module.exports.rendersignUpForm=(req,res)=>{
     res.render("users/signUp.ejs");
};


module.exports.signUp=async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    username = username.trim();
    email = email.trim();

    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
  if (err) return next(err);

  req.flash("success", "Welcome to Wanderlust");

  const redirectUrl = req.session.redirectUrl || "/listings";
  delete req.session.redirectUrl;

  return res.redirect(redirectUrl);
});


  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};
//login

module.exports.renderLoginForm=(req, res) => {
  res.render("users/login.ejs");
};

module.exports.login=(req, res) => {
    req.flash("success", "Welcome back to Wanderlust");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    delete req.session.redirectUrl;  
    res.redirect(redirectUrl);
  }


//logout
module.exports.logOut=(req,res,next)=>{
  req.logout((err)=>{
    if(err){
     return next(err);
    }
    req.flash("success","you are logged out!");
    res.redirect("/listings");
  });
};