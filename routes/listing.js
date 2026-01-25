const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
 
const mongoose=require("mongoose");
const {
  isLoggedIn,
  isOwner,
  validateListing,
  uploadImage
} = require("../middleware.js");

 

const listingController=require("../controllers/listing.js");
console.log("listing routes file loaded");

router.route("/")
.get(wrapAsync(listingController.index))
 .post(
  isLoggedIn,
  uploadImage,
  validateListing,
  wrapAsync(listingController.createListing)
);

  //new route
 router.get(
  "/new",
  isLoggedIn,
  wrapAsync(listingController.renderNewForm)
);


router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
  isLoggedIn,
  isOwner,
  uploadImage,
  validateListing,
  wrapAsync(listingController.updateListing)
)



.delete(isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing));
 


 //edit route
router.get("/:id/edit", isLoggedIn,isOwner,
  wrapAsync(listingController.editListing));

module.exports=router;
 