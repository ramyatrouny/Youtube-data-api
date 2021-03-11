require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const verifyMiddleware = require('./middleware/verifyMiddleware');
const connectDB = require('./config/db');

const app = express();

const indexRouter = require('./routes/api');
const authRouter = require('./routes/auth');

app.use(morgan('dev'));

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/documentation', (_, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Public routes that do not require a bearer token
app.use('/auth', authRouter);
// Routes that are restricted for logged in users
// Handled through verifyMiddleware
app.use('/api', verifyMiddleware, indexRouter);

module.exports = app;
