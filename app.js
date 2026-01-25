require("dotenv").config();  
 

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");
 

const SESSION_SECRET = process.env.SECRET || "dev-secret-key";

const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
 



const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");

//const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"

 const dbUrl =
  process.env.ATLASDB_URL?.trim() ||
  "mongodb://127.0.0.1:27017/wanderlust";


main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
console.log(err);
});

async function main(){
    await mongoose.connect(dbUrl);
}

app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.path);
  next();
});

const MongoStore = require("connect-mongo");
 
const store = MongoStore.create({
  mongoUrl: dbUrl,
  collectionName: "sessions",
});


console.log("DB URL:", dbUrl);
console.log("SESSION SECRET:", SESSION_SECRET);

app.use(
  session({
    store,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true, // IMPORTANT FIX
    cookie: {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);


  
// app.get("/",(req,res)=>{    
// res.send("Hi i am root");
// });

 



 
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

 

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});



// app.get("/demouser",async(req,res)=>{
//     let fakeUser=new User({
//         email:"student@gmail.com",
//         username:"delta-student",
//     });

//     let registeredUser=await user.register(fakeUser,"helloworld");
//     res.send(registeredUser);
// });
app.get("/", (req, res) => {
  res.redirect("/listings");
});


app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

  
  app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err); //  prevents crash
  }
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

 const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
