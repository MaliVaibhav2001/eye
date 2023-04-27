// Creating A Data base
const dotenv = require("dotenv").config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)
.then(() => {console.log("Connected with eye")})
.catch((err) => {console.log(err)})