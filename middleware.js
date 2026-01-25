const Listing=require("./models/listing");
const {listingSchema,reviewSchema}=require("./schema.js");
const ExpressError=require("./utils/ExpressError.js");
const Review=require("./models/review");
const multer = require("multer");
const { storage } = require("./cloudConfig"); // adjust path if needed


const upload = multer({ storage });

const uploadImage = (req, res, next) => {
  upload.single("listing[image]")(req, res, function (err) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("/listings/new"); // ✅ STOP
    }
    next();
  });
};



module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; // save intended page
    req.flash("error", "Please login first to add a listing.");
    return res.redirect("/login");
  }
  next();
};




 module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};


module.exports.isOwner=async(req,res,next)=>{
const { id } = req.params;

const listing = await Listing.findById(id);

     
    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    
    if (!listing.owner || !listing.owner.equals(req.user._id)) {
      req.flash("error", "You do not have permission to edit this listing");
      return res.redirect(`/listings/${id}`);
    }
    req.listing = listing;
    
next();
};

 module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    req.flash("error", msg);
    return res.redirect("/listings/new"); // ✅ STOP here
  }
  next();
};


 module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    req.flash("error", msg);
    return res.redirect("back"); // ✅ safe for reviews
  }
  next();
};

 
 
 module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    req.flash("error", "Review not found");
    return res.redirect(`/listings/${id}`);
  }

  //  ONLY review owner can delete
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to delete this review");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

module.exports.uploadImage = uploadImage;
