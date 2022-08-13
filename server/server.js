const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');

const morgan = require('morgan')
require('dotenv').config();

const port = process.env.PORT

const app = express();

// DataBase
try {
    mongoose.connect(process.env.DB_QUERYSTRING);
    console.log("DB Ready");
  } catch (error) {
    console.log("Have problem with connecting to database");
  }


// Middlewares
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());

//Routes
fs.readdirSync('./routes').map((route) => app.use('/api', require(`./routes/${route}`)));


app.listen(port, () => console.log(`Server listening on port ${port}`));