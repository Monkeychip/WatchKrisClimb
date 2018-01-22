//Main Starting point
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan'); //logging framework
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

//DB setup
mongoose.connect('mongodb://localhost:auth/auth');// internally creates db inside mongoose called auth

//App Setup
app.use(cors()); //middleware for handling cors.  Can specify for just strava domain or my domain
app.use(morgan('combined')); 
app.use(bodyParser.json({ type: '*/*' }));

//EJS setup
// set the view engine to ejs
app.set('view engine', 'ejs');
var path = require('path');
app.use('/views', express.static(path.join(__dirname + '/views')));
//app.set('views', __dirname + 'views'); 

router(app);

//Server Setup
const port = process.env.PORT || 3002;
const server = http.createServer(app);
server.listen(port);
console.log('Server is listening on:', port);




