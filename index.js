const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/user.model.js");
const userRoute = require("./routes/user.route.js");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//routes
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

mongoose
  .connect(
    "mongodb+srv://ferdiansya3007:3AmP1m89oaiyv70J@userapi.vgtoh.mongodb.net/?retryWrites=true&w=majority&appName=userapi"
  )
  .then(() => {
    console.log("Connect to Database!");
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch((error) => console.log('Connect Failed', error.message));
