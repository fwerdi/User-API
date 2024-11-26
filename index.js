const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/user.model.js");
const userRoute = require("./routes/user.route.js");
const authRoute = require("./routes/auth.route.js");
require('dotenv').config()
// var cors = require('cors')
var app = express()

const cors = require('cors')
app.use(cors());

// var corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// app.use(cors(corsOptions))



// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/uploads', express.static('uploads'));


//routes
app.use("/api/users", userRoute);
app.use("/auth", authRoute);

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
