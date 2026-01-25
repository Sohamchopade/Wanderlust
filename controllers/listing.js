const Listing=require("../models/listing.js");
const mongoose=require("mongoose");
 

const { cloudinary } = require("../cloudConfig");

 
  const geocodeLocation = async (location) => {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
    const response = await fetch(url, {
      headers: { "User-Agent": "wanderlust-app" },
    });
    return await response.json();
  } catch (err) {
    return null; // 🔥 prevents server crash
  }
};

//index route
 module.exports.index = async (req, res) => {
  const { country } = req.query;

  let allListings;

  if (country && country.trim() !== "") {
    allListings = await Listing.find({
      country: { $regex: country, $options: "i" }
    });
  } else {
    allListings = await Listing.find({});
  }

  res.render("listings/index.ejs", { allListings, country });
};


//new route
 module.exports.renderNewForm = (req, res) => {
  return res.render("listings/new");
};

//create listing
module.exports.createListing = async (req, res, next) => {
  try {
    const data = req.body.listing;

    const geoData = await geocodeLocation(data.location);

    if (!geoData || geoData.length === 0) {
      req.flash("error", "Location not found!");
      return res.redirect("/listings/new");
    }

    const newListing = new Listing(data);

    newListing.geometry = {
      type: "Point",
      coordinates: [
        Number(geoData[0].lon),
        Number(geoData[0].lat),
      ],
    };

    if (req.file) {
      newListing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    newListing.owner = req.user._id;

    await newListing.save();

    req.flash("success", "New listing is created!");
    return res.redirect("/listings");
  } catch (err) {
    return next(err); // ✅ prevents double response
  }
};

 

  

//Edit routes

 module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you are looking for does not exist!");
    return res.redirect("/listings");
  }

  let originalImgUrl;
  if (listing.image && listing.image.url) {
    originalImgUrl = listing.image.url.replace("/upload", "/upload/w_250");
  }

  return res.render("listings/edit.ejs", { listing, originalImgUrl });
};

 //update lisitng
  
   module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const newLocation = req.body.listing.location;

  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  if (newLocation !== listing.location) {
    const geoData = await geocodeLocation(newLocation);
    if (geoData && geoData.length > 0) {
      listing.geometry = {
        type: "Point",
        coordinates: [geoData[0].lon, geoData[0].lat],
      };
    }
  }

  listing.title = req.body.listing.title;
  listing.description = req.body.listing.description;
  listing.price = req.body.listing.price;
  listing.location = newLocation;
  listing.country = req.body.listing.country;

  if (req.file) {
    if (listing.image && listing.image.filename) {
      await cloudinary.uploader.destroy(listing.image.filename);
    }
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  await listing.save();
  req.flash("success", "Listing updated successfully!");
  return res.redirect(`/listings/${id}`);
};

 
// delete listing
module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing is deleted!");
  return res.redirect("/listings");
};

  
//show route
module.exports.showListing=async (req, res) => {
  let { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }

   const listing = await Listing.findById(id)
  .populate({
    path: "reviews",
    populate: {
      path: "author"
    },
  })
  .populate("owner");


  if (!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }
console.log(listing);
  res.render("listings/show.ejs", { listing });
};

 
