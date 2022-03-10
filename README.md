Phonebook-app 
=============

You can open this app in https://rocky-cliffs-13747.herokuapp.com/ !!

This readme file contains the presentation of the project and its development stages.  
The Phonebook-app was created as an assignment project for the Fullstackopen course from the University of Helsinki.  The point of the assignment is to learn how to build a frontend, a backend and how to deploy the whole app to the internet.

# The process
0. [Phonebook-App](#phonebook-app)
1. [Frontend](#frontend)
2. [Backend](#backend)
3. [Deployment](#deployment)
4. [Comments](#comments)


## Phonebook-App

The Phonebook app is a tool for managing, adding and deleting Names and their associated phone numbers. The frontend is built with React and axios,  and the backend server is built with Node and Express.  The fullstack project is deployed via Heroku as a dynamic web-app.

## Frontend 

The initial set up was created using $ npx create-react-app, and as initial dependencies we set npm install axios and npm install.

The app imports useState for handling the state of the variables associated to the names, numbers, search-filters, contact-lists, rendering conditions and success messages.  
 
Most of the input handling and all of the state management is done in the main App.js component, while the individual JSX components are imported from modules.

The external communication with the server is done in the persons.js module in the services folder and uses the axios library to simplify the code. The local api/persons path is selected as the base url for server connection.

## Backend

The backend was setup initially using $ npm init and then Express, CORS, morgan and nodemon were installed.  

An initial object called persons contains a few hard-coded contacts, and after all of the middleware declarations, we declare the basic get, put & delete functions.

Express simplifies the coding for the communication functions.

## Deployment

The deployment is made to a Heroku server. 

The backend resides in the /api/persons web directory, and the main adress $%&/%.com returns the frontend index.html.

The following scripts resumes the deployment process:

"build:ui": "rm -rf build && cd ../../the-phonebook/ && npm run build --prod && cp -r build ../Phonebook-backend",
"deploy": "git push heroku main",
"deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push -u origin main && npm run deploy",
"logs:prod": "heroku logs --tail"

The first script, build:ui, erases the current frontend build, constructs a new frontend build and copies it to the backend's root directory

The second script, deploy, pushes the repo to Heroku.

deploy:full links the whole process, first it updates the frontend build, then commits the backend changes , pushes the code and deploys the app.

## Comments
