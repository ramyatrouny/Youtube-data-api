require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors')

const app = express();

const indexRouter = require('./routes/index');
const connectDB = require('./config/db');

app.use(morgan('dev'));

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/documentation', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use('/api', indexRouter);

module.exports = app;
