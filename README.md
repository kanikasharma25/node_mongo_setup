# RPRT ( nodejs + mongodb )
The RP-RT Prospecting Application will support outbound sales reps by helping them plan and execute daily prospecting routes.

## Tech Stack
- Node.js
- Express.js
- MongoDB
- salesforce

## Installation
git clone repoPath
cd project
npm install

## Create .env file
need all the required keys for project

## Packages Used

| Package           | Version   | Purpose |
|-------------------|-----------|---------|
| node              | ˆ18.20.8  | Runtime environment for executing JavaScript code on the server side.|
| express           | ^5.1.0    | Web framework to handle routes and middleware |
| mongoose          | ^^8.16.4  | ODM to interact with MongoDB easily |
| bcrypt            | ^6.0.0    | to encrypt password before saving them to db |
| dotenv            | ^17.2.0   | Load environment variables from '.env' file |
| jsonwebtoken      | ^9.0.2    | To create/verify JWT tokens for secure auth |
| nodemon           | ^3.1.0    | Auto-restarts the server during development |
| cors              | ^2.8.5    | Allow frontend apps (like React) to connect without CORS issues |
| express-validator | ^7.2.1    | Middleware to validate and sanitize incoming request data (e.g. email, password). |
| nodemailer        | ^7.0.5    | Used to send emails |                                                               
| mongan            | ^1.10.1   | used to get api proper log while development |
| axios             | ^1.11.0   | used to make HTTP requests (like token exchange and Salesforce API calls) |