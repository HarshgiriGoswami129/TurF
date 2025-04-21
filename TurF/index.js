const express =  require('express');
const app = express();
const mongoose = require('mongoose');
const {connectionMongoose} = require("./connection");
const turfRoute = require("./routs/turf");
const turfModel = require("./models/turf");
const path = require('path');
const PORT = 8000;

connectionMongoose("mongodb://localhost:27017/turF").then(()=>console.log("Connection Establish")).catch(() => console.log("Error at mongoose"));

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/turf",turfRoute);

app.listen(PORT,()=>console.log(`Server Started at port ${PORT}`));
