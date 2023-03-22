# Let's play
## Intro
Let's play is a full-stack web application designed to make it easy for users to organize and join pick-up sports games in their local area. You can check it out 
<a href="https://www.letsplay.up.railway.app/">HERE</a>. 

You can create your own profile or use the login: guest@guest.com and password: 'password' <br><br>
<a href="https://www.letsplay.up.railway.app/">
<img src="https://res.cloudinary.com/dng1obd8k/image/upload/v1677685845/letsplay_cvryje.gif" style="width: 80%;">
</a><br><br>
The application uses an MVC structure and stores data using MongoDB. It also utilizes Cloudinary to upload and store photos for user avatars and the Google Maps API to get coordinates for events and users. The main goal of the project is to make sports more fun and accessible to everyone. 

## Prerequisites

In order to run the application yourself, you will need to have the following API keys and software installed:

  - Node.js
  - MongoDB
  - Google Maps API key (You will need to sign up to Google Cloud Platform)
  - Cloudinary account and API key

## Installation

To install the application, users should follow these steps:

    - Clone the repository from Github.
    - Navigate to the root directory of the project in the terminal.
    - Run the command npm install to install the necessary dependencies.

### Things to add

  - Create a `.env` file in config folder and add the following as `key = value`
    - PORT = 2121 (can be any port example: 3000)
    - DB_STRING = `your database URI`
    - CLOUD_NAME = `your cloudinary cloud name`
    - API_KEY = `your cloudinary api key`
    - API_SECRET = `your cloudinary api secret`
    - GOOGLE_MAPS_API_KEY = `your google maps api key`

---

## Running the Application

To run the application, users should follow these steps:

    - Start the MongoDB server.
    - In the terminal, navigate to the root directory of the project.
    - Run the command 'npm start' to start the server.
    - Navigate to http://localhost:3000 in a web browser to access the application.

---
## Features


  - User authentication using Passport middleware
  - User authorization: The actions that the user is authorized to perform based on their user ID stored in the MongoDB database
  - Ability for users to create and join pick up sports games in their local area
  - Integration with the Google Maps API to get coordinates for events and users
  - Ability to filter events by sport and distance from the user's location using geospatial queries in MongoDB
  - Ability to upload and store photos for user avatars using Multer middleware and Cloudinary API
    
---

## Authentication and Authorization

The application uses Passport middleware for authentication. Users can create an account and log in using their email and password. Once logged in, users are able to create and join game events. 

User authorization: The actions that the user is authorized to perform are based on their user ID stored in the MongoDB database.

---
## Middleware

  - Passport: Used for user authentication and authorization.
  - Multer: Used for handling file uploads, such as user avatars.
  - Morgan: Used for HTTP request logging.
  - Express-validator: Used for validating user input data.

---
## Limitations and potential improvements

  - The application's UI/UX could be improved.
  - Currently no option for users to edit or delete their account.
  - Currently no option to add friends. When this is added, games could easily be filtered by games that their friends have created/joined. 
  
  - Potential to add a notification system that sends emails to users involved when a game is confirmed to have enough players. This could allow them to add the event to their calendar.
  - The application is only available in English.
  - The application is limited to organizing and joining pick-up sports games only. It does not support league play or keeping scores etc. 

---
## Contributing

Contributions to the project are welcome. To contribute, please fork the repository and create a pull request with your proposed changes.

---
## Acknowledgments
This webapp was built using Leon Noel's Binary Upload Boom social media site template. 

---
## Other projects
Check out my portfolio including my latest projects <a href="https://martintore.netlify.app/">here.</a>

---
## Resources

The following resources were used in the development of this project:

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary API](https://cloudinary.com/documentation)
- [Google Maps API](https://developers.google.com/maps/documentation)
- [Express.js](https://expressjs.com/)
- [Passport.js](http://www.passportjs.org/)
- [Multer.js](https://www.npmjs.com/package/multer)
- [Morgan.js](https://www.npmjs.com/package/morgan)
- [Express-validator](https://express-validator.github.io/docs/)
