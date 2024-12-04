const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/user.model.js");
const userRoute = require("./routes/user.route.js");
const authRoute = require("./routes/auth.route.js");
const protectedRoute = require('./routes/protected.route.js');  // Pastikan path-nya benar
const jwt = require('jsonwebtoken');
require('dotenv').config()
var cors = require('cors')
var app = express()

// const cors = require('cors')
app.use(cors());


app.use(cors({
  origin: '*',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization']  
}));




// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/uploads', express.static('uploads'));


//routes
app.use("/api/users", userRoute); 
app.use("/auth", authRoute);  
app.use("/api", protectedRoute);  


app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

mongoose
  .connect(
    process.env.mongodb_url
  )
  .then(() => {
    console.log("Connect to Database!");
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch((error) => console.log('Connect Failed', error.message));
