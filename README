# Wanderlust — Full-Stack Property Marketplace

Wanderlust is a full-stack property marketplace inspired by Airbnb, built using Node.js, Express.js, MongoDB, and EJS. It allows users to explore property listings, manage properties, upload images, and share reviews through a web-based interface.

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-2563EB?style=for-the-badge)](https://majorproject-05kd.onrender.com/)

## Features

- **Property Listing Management:** Create, view, edit, and delete property listings with details such as title, description, price, and location.
- **User Authentication:** Implemented authentication using Passport.js and Passport Local with session-based user management.
- **Authorization:** Restricted listing modifications to authorized owners and protected review operations.
- **Cloud Image Uploads:** Integrated Multer and Cloudinary to handle property image uploads and cloud storage.
- **Location-Based Listings:** Integrated geocoding to convert user-provided addresses into geographical coordinates for map visualization.
- **Reviews and Ratings:** Enabled users to add and manage reviews associated with property listings.
- **Data Integrity:** Used Mongoose middleware to delete associated reviews when a listing is deleted.
- **Input Validation:** Implemented Joi validation to validate listing and review data before processing requests.
- **MVC Architecture:** Organized application logic into models, views, controllers, and routes for maintainability.

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript, EJS, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** Passport.js, Passport Local, Express Session
- **Validation:** Joi
- **Image Uploads:** Multer, Cloudinary
- **Geocoding:** OpenStreetMap Nominatim API
- **Architecture:** Model–View–Controller (MVC)
- **Deployment:** Render
- **Version Control:** Git, GitHub

## Project Structure

- `controllers/` — Handles application logic for listings, reviews, and users.
- `models/` — Defines MongoDB schemas using Mongoose.
- `routes/` — Defines listing, review, and authentication routes.
- `views/` — Contains EJS templates for rendering pages.
- `public/` — Stores static assets such as CSS, JavaScript, and images.
- `utils/` — Contains utility functions and error-handling classes.
- `middleware.js` — Handles authentication, authorization, and validation middleware.
- `cloudConfig.js` — Configures Cloudinary image storage.
- `schema.js` — Defines Joi validation schemas.
- `app.js` — Configures and starts the Express application.

## Key Implementation Details

### MVC Architecture

Separated models, views, controllers, and routes to organize application logic and improve maintainability.

### Cloud Image Management

Integrated Multer with Cloudinary storage to process property image uploads and store hosted image references with listing data.

### Geospatial Data

Converted property addresses into geographical coordinates and stored location data in GeoJSON Point format in MongoDB to support map-based visualization.

### Authentication and Authorization

Implemented Passport.js authentication with MongoDB-backed session persistence and middleware to protect listing and review operations.

### Data Integrity and Validation

Used Mongoose middleware to remove associated reviews when a listing is deleted and Joi schemas to validate incoming listing and review data.

## Try Wanderlust

Explore property listings, view property details, and test the available listing and review features.

[![Visit Wanderlust](https://img.shields.io/badge/EXPLORE_WANDERLUST-Visit_App-2563EB?style=for-the-badge)](https://majorproject-05kd.onrender.com/)

## Author

**Soham Chopade**

[![GitHub](https://img.shields.io/badge/View_Profile-181717?style=for-the-badge&logo=github)](https://github.com/Sohamchopade)

---

Built as a full-stack web development project to practice backend development, database management, authentication, cloud image storage, geocoding, and server-side validation.
