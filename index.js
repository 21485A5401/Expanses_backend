const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const router = require('./Routes/Router.js');
require('dotenv').config();
const PORT = process.env.PORT;
app.use(cors());

app.use(bodyParser.json()); // support json encoded bodies

const mongo_url = process.env.MONGO_URL;
mongoose.connect(mongo_url);
console.log("Connected to the database!");

app.use('/',router);

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server Running on Port " + PORT);
    } else {
        console.log("Error :" + error)
    }
})

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
})