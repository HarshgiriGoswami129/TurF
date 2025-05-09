const express = require("express");
const { getTurf, addTurf } = require("../controller/turf");
const router = express.Router();
const multer = require("multer");
const path = require('path');
const authMiddleware = require('../middleware/auth');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

// Routes
router.post("/addTUrf", authMiddleware, upload.single('image'), addTurf);
router.get("/getTurf", authMiddleware, getTurf);

module.exports = router;
