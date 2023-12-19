const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000;
const cors=require("cors");
// app.use(cors());
const corsOptions ={
   origin:'https://erp.thejbschool.com'
}

app.use(cors(corsOptions)) 

app.use(express.json());
require('./src/db/conn');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const studentRoutes = require("./routes/ProfileRoute");
app.use("/", studentRoutes);


app.listen(PORT, () => {
    console.log("Backend server running on port " + PORT)
})
