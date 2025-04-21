const express = require("express");
const {getTurf,addTurf} = require("../controller/turf");
const router = express.Router();
const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now()+'-'+file.originalname;
        cb(null,uniqueSuffix);
    }
});

const upload = multer({storage:storage});

router.post("/",upload.single('image'),addTurf);
router.get("/",getTurf);

module.exports = router;