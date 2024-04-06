require('dotenv').config();

//Importing packages
const http = require('http');
const {Server} = require('socket.io');
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo');

//Requiring DB
const connectDB = require('./backend/server/config/db');

//Express app instance
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 8080;

//Static serve
app.use(express.static('frontend/public'));

//Adding middleware
app.use(express.urlencoded({extended:true})); //To pass data through forms
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}))

//Templating engines and layouts
app.use(expressLayout);
app.set('views', 'frontend/views');
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//Setting the routes source
app.use('/', require('./backend/server/routes/main'));
app.use('/', require('./backend/server/routes/admin'));

//Socket.io connection
io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

//Establishing connection to DB and running the server
connectDB().then(()=>{
    server.listen(PORT, () => {
        console.log(`App listening at port ${PORT}`);
        console.log(`URL: http://localhost:${PORT}`);
    });
});
