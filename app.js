require('dotenv').config();

//Importing packages
const express = require('express');
const expressLayout = require('express-ejs-layouts');

//Express app instance
const app = express();
const PORT = process.env.PORT || 8080;

//Static serve
app.use(express.static('frontend/public'));

//Templating engine and layout
app.use(expressLayout);
app.set('views', 'frontend/views');
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//Setting the routes source
app.use('/', require('./backend/server/routes/main'));
app.use('/', require('./backend/server/routes/admin'));

//Running the server
app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
})