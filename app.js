const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const express = require('express');
const app = express();


// get config vars
dotenv.config();

// access config var
const token = process.env.TOKEN_SECRET;
const port = process.env.PORT;

// parse app
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


// db
const { models } = require('./models');

// routes
const { index } = require('./routes');

// auth
const { generateAccessToken, authenticateToken } = require('./helpers/auth');

// websocket
const { ioSocket } = require('./rtc');
const io = ioSocket(app);

index(app, models, generateAccessToken, authenticateToken, jwt, io);

app.listen(port, () => {
    console.log(`Listening port ${port}`);
});