const express = require("express");
// const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('./routes/user.routes');
const messageRoutes = require('./routes/message.routes');

const app = express();


const db = require("../app/models");
db.sequelize.sync()
  .then(() => {
    console.log(`Synced`);
  })
  .catch((err) => {
    console.log(`Failed to sync ${err.message}`);
  });


var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes)


module.exports = app
 