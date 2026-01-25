const express=require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const{validateReview, isLoggedIn,isReviewAuthor}=require("../middleware.js");
const {listingSchema}=require("../schema.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");

const reviewController=require("../controllers/review.js");

console.log("review file loaded")
//reviews
//post Route

router.post(
  "/",
  validateReview,
  isLoggedIn,
  wrapAsync(reviewController.createReview));

//  DELETE review (THIS MUST COME BEFORE 404)
  router.delete(
  "/:reviewId",
  isLoggedIn,
   isReviewAuthor,
  wrapAsync(reviewController.destroyReview));


module.exports=router;
  