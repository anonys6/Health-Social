# Health-Social

Health-Social is a web application built with Node.js, Express, EJS, and Socket.io. It serves static files from the `frontend/public` directory and uses EJS as the templating engine. The application also includes a chat feature powered by Socket.io.

## Running the Application

To run the application, follow these steps:

1. Install the dependencies with `npm install`.
2. Start the server with `npm start`.

The application will start on port 8080 or the port specified in your `.env` file.

## Application Structure

- `app.js`: The entry point to our application. This file defines our express server and sets up Socket.io. It also requires the routes we'll be using in the application.
- `backend/server/routes/`: This folder contains the route definitions for our app. The routes include a home page, a chat page, and a BMI calculator page.
- `frontend/public/`: This folder contains static files like CSS and JavaScript files.
- `frontend/views/`: This folder contains EJS templates that our app will use.

## Live Application

You can view the live application at the following link:

[Health-Social App](https://health-social-9c7a6ee6cfa7.herokuapp.com/)

## Local Development

For local development, clone the repository and install the dependencies:

```sh
git clone https://github.com/anonys6/Health-Social.git
cd Health-Social
npm install
npm start
```

Then open your browser and visit `http://localhost:8080/` to view the application.