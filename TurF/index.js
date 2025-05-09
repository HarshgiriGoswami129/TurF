const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { connectionMongoose } = require("./connection");
const turfRoute = require("./routs/turf");
const authRoute = require("./routs/login_registration");
const path = require('path');
const PORT = 8000;

connectionMongoose("mongodb://localhost:27017/turF")
  .then(() => console.log("MongoDB connection established"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/turf", turfRoute);
app.use("/api/auth",authRoute);
app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
