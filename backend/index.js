const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000;
const cors=require("cors");
// app.use(cors());
app.use(express.json());
require('./src/db/conn');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const studentRoutes = require("./routes/ProfileRoute");
app.use("/", studentRoutes);

const allowedOrigins = ['https://erpapp-frontend.vercel.app', "https://erp.thejbschool.com"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.listen(PORT, () => {
    console.log("Backend server running on port " + PORT)
})
