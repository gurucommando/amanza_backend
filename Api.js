const express = require("express");
const { urlencoded } = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
var bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const router = require("./router/router");
app.use(
  cors({
    origin: "*",
  })
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("success123");
  })
  .catch((err) => {
    console.log(process.env.DB_URL, "Error_123", err);
  });

app.use(
  urlencoded({
    extended: true,
    
  })
);
app.use("/panda", router);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
