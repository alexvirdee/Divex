# Divex
[Divex](http://divex.herokuapp.com/ "Divex")

## About
Divex is a scuba diving logbook built to remember your dive experiences. I've always wanted to make my own diving application so that I could save my dives and create an interactive application for other divers to use. The application is built with Node, express, and a MongoDB database. the front end is rendered using ejs. The app incorporates the Google Maps API which renders based on a divers GPS coordinates location they input into the database when they add a new dive.

### Home 
![Home Page](/public/images/Home-page.png) 

### Authentication
User authentication built using Passport with Express the app uses encryption salts to hash user passwords for protection. The app also allows for scoial logins on both Facebook and Google. This allows for a personal application for the user to log their own diving experiences. 


