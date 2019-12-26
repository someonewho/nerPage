const express = require('express');
const bodyParser = require('body-parser')
const logger = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors');

// For distribution Port
const API_PORT = 5010;

// Init Express Server App
const app = express();
const api = require('./routes/index');
const userAPI = require('./routes/UserAPI');
const qna = require('./routes/qna');
const notice = require('./routes/notice');
const trainInfo = require('./routes/trainInfo');
const reservation = require('./routes/reservation');
const trainRoute = require('./routes/trainRoute');
const nerOutput = require('./routes/nerOutput');

// Connection with MongoDB
const dbRoute = 'mongodb://106.10.38.76:5570/ReservSystem';
mongoose.connect(dbRoute, {useNewUrlParser: true});
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Server App Configure
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev')); // logging

// Server App Routing
app.use('/api', api);
app.use('/api/user', userAPI);
app.use('/api/qna', qna);
app.use('/api/notice', notice);
app.use('/api/trainInfo', trainInfo);
app.use('/api/reservation', reservation);
app.use('/api/trainRoute', trainRoute);
app.use('/api/nerOutput', nerOutput);


// Server App method
app.get('/test', (req, res) => {
    return res.send('Hello World');
})

// Server Socket Listening
const port = process.env.PORT || API_PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));
