
const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const helmet = require("helmet");
var dotenv = require('dotenv');
dotenv.config();
const rateLimit = require('express-rate-limit')

const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/messages');

const app = express();
app.use(helmet());

app.use((req, res, next) => {
  res.removeHeader("Cross-Origin-Embedder-Policy");
  next();
});


mongoose.connect('mongodb+srv://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + '@' + process.env.MONGO_HOST + '/' + process.env.MONGO_DATABASE_NAME)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images"))); 
app.use('/api/auth', userRoutes);

app.use('/api/messages', apiLimiter, messageRoutes);

module.exports = app;

