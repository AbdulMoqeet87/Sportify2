Sportify2
Sportify2 is a full-stack web application that enhances your sports arena bookingg experience by integrating with the Spotify API. The application features a robust backend server and a dynamic frontend interface. The idea is that all Sports Arenas arenas like Gaddaffi Stadium, Lahore are present in the database. Code links the Data to allow users to make reservation in any of the available sport arena they want.

Table of Contents
->Features
->Installation
->Backend Setup
->Frontend Setup
->Usage
->Folder Structure
->License

Features
->Sportify Integration: Seamlessly connect to to all sport arenas in the selected location and in given time slot.
->Responsive Design: Enjoy a user-friendly interface across all devices.
->Real-time Updates: Experience real-time updates and interactions with the Sportify API i.e if resrvation made by anther user before, chnages to datbase saved and transaction processed and status of that stadium wil be booked/un-available for anither user who wants to book in the same slot

Installation

Prerequisites
Ensure you have the following installed:

Node.js (version 12 or higher)
npm (version 6 or higher)

Backend Setup
Install Dependencies
Navigate to the backend directory and install the required dependencies:
    cd backend
    npm install

Configuration
Create a .env file in the backend directory with the following environment variables:
    SPOTIFY_CLIENT_ID=your_spotify_client_id
    SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
    DATABASE_URL=your_database_url

Running the Server
Start the backend server:
    node app.js

Frontend Setup
Install Dependencies
Navigate to the frontend directory and install the necessary dependencies:
    cd frontend
    npm install

Configuration
Create a .env file in the frontend directory with the following environment variables:
    REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
    REACT_APP_SPOTIFY_REDIRECT_URI=your_redirect_uri

Running the Frontend
To start with the frontend development server:
    npm start

Usage:
    Once both the backend and frontend servers are running, access the application by navigating to http://localhost:3000 in your web browser. Log in with your Spotify account to start managing your playlists.

Folder Structure:
    Sportify2/
    ├── backend/
    │   ├── config/
    │   ├── controller/
    │   ├── database/
    │   ├── error/
    │   ├── models/
    │   ├── public/
    │   ├── routes/
    │   ├── app.js
    │   ├── server.js
    │   ├── package.json
    │   └── package-lock.json
    └── frontend/
        ├── public/
        ├── src/
        ├── .gitignore
        ├── README.md
        ├── package.json
        ├── package-lock.json
        └── tailwind.config.js

License
This project is licensed under the MIT License. See the LICENSE file for details.

