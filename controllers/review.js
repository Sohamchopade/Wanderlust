const Listing=require("../models/listing");
const Review=require("../models/review.js");

//create review
module.exports.createReview=(async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      throw new ExpressError(404, "Listing not found");
    }

    const newReview = new Review({
    author:req.user._id,
      comment: req.body.review.comment,
      rating: Number(req.body.review.rating),
      listing: listing._id,   //  THIS IS THE KEY LINE
    });

    await newReview.save();

    listing.reviews.push(newReview._id);
    await listing.save();
 req.flash("success","New review is Created!");
    res.redirect(`/listings/${listing._id}`);
  });

  //delete review
 module.exports.destroyReview=async (req, res) => {
     const { id, reviewId } = req.params;
 
     await Listing.findByIdAndUpdate(id, {
       $pull: { reviews: reviewId }
     });
 
     await Review.findByIdAndDelete(reviewId);
 
     req.flash("success", "Review deleted!");
     res.redirect(`/listings/${id}`);
   };