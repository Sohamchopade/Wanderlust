const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");

const listingSchema=new Schema({
     
   title: {
  type: String,
  required: [true, "Title is required"],
  minlength: [1, "Title cannot be empty"],
  validate: {
    validator: function (v) {
      return /^[A-Za-z0-9\s\-\/,]+$/.test(v);
    },
    message: props =>
      `${props.value} is not valid! Title contains invalid characters`
  }
},
  

     description: {
    type: String,
    required: [true, "Description is required"],
    
  },
     image: {
   url:String,
   filename:String,
},

    price: {
    type: Number,
    required: true,
  },

  location: {
    type: String,
    required: true,
    match: [/^[A-Za-z\s]+$/, "Location must contain only letters"],
  },

  country: {
    type: String,
    required: true,
    match: [/^[A-Za-z\s]+$/, "Country must contain only letters"],
  },
 
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review"
    },
  ],

  geometry: {
  type: {
    type: String,
    enum: ["Point"],
    required: true
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    required: true
  }
},

 
owner:{
  type:Schema.Types.ObjectId,
  ref:"User",
}
});

listingSchema.pre("findOneAndDelete", async function () {
  console.log("PRE DELETE MIDDLEWARE TRIGGERED");

  const listing = await this.model.findOne(this.getQuery());
  console.log("LISTING FOUND IN MIDDLEWARE:", listing);

  if (listing) {
    const result = await Review.deleteMany({
      _id: { $in: listing.reviews }
    });
    console.log("REVIEWS DELETED:", result.deletedCount);
  }
});




const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;