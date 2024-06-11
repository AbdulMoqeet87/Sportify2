**Project Introduction: Sportify2**

**Project Overview**

Seamlessly discover and book local sports arenas, join exciting tournaments, and allows ground owners to post their venues and host tournaments.

**Features**
Ground Booking System: Users can book sports grounds based on available slots.
Tournament Management: Organize and manage sports tournaments, including team registrations and scheduling.
User Reviews and Ratings: Users can review and rate grounds and tournaments.
Add Ground: Ground owner can create a new ground.
Post Tournament: Ground owner can post a tournament.

****Technologies and Languages Used******

**Backend**

Node.js: A JavaScript runtime used for building the server-side application.
Express.js: A web framework for Node.js, used to create the RESTful API.
Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js, used to define schemas and interact with the database.
Validator: A library used for data validation, such as email validation.

**Frontend**
React.js: A JavaScript library for building user interfaces.
Tailwind CSS: A utility-first CSS framework used for styling the frontend.

**Database**
MongoDB: A NoSQL database used to store data. The database interactions are facilitated through Mongoose.
Postman: Used for testing and managing API endpoints and database operations during development.
Approach to ERD and Schema Implementation
Entity-Relationship Diagram (ERD): The ERD was designed to map out the relationships between various entities such as Ground Owners, Grounds, Tournaments, Slots, Reviews, and Ratings.
Schema Implementation: Using Mongoose, we implemented schemas to model our database structure in MongoDB. Each schema represents an entity with defined fields and relationships.

**JSON Usage**
API Requests and Responses: JSON is used as the format for API requests and responses, allowing the frontend and backend to communicate effectively.
Database Operations: Data stored in MongoDB is in BSON (Binary JSON) format. Mongoose helps in converting JSON data to BSON and vice versa.

**Example Schema: Ground Owner**
    import mongoose from "mongoose";
    import validator from "validator";
    const { Schema } = mongoose;
    
    const groundOwnerSchema = new Schema({
      UserName: {
        type: String,
        required: true,
        minLength: [3, "Username must be at least 3 characters long."],
        maxLength: [255, "Username cannot exceed 255 characters."]
      },
      FirstName: {
        type: String,
        minLength: [3, "First Name must be at least 3 characters long."],
        maxLength: [255, "First Name cannot exceed 255 characters."]
      },
      LastName: {
        type: String,
        minLength: [3, "Last Name must be at least 3 characters long."],
        maxLength: [255, "Last Name cannot exceed 255 characters."]
      },
      Password: {
        type: String,
        required: true,
        minLength: [6, "Password must be at least 6 characters long."]
      },
      email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Provide a valid email"]
      },
      PhoneNo: {
        type: String,
        required: true,
        minLength: [11, "Phone number must contain 11 digits."],
        maxLength: [11, "Phone number must contain 11 digits."]
      },
      Grounds: [groundSchema]
    });
    
    export const GroundOwner = mongoose.model("GroundOwner", groundOwnerSchema);


**Implementation Highlights**

API Development: Developed using Express.js, providing endpoints for CRUD operations on entities like grounds, tournaments, and reviews.
Frontend Integration: React components interact with the backend via RESTful API calls, managing state and rendering dynamic content.
Data Validation: Using validator for email validation and Mongoose for schema validations ensures data integrity and reliability.



