const TURF = require("../models/turf");

async function addTurf(req,res){

    const categories = Array.isArray(req.body.categories)?req.body.categories:JSON.parse(req.body.categories);
    const amenities = Array.isArray(req.body.amenities)?req.body.categories:JSON.parse(req.body.amenities);

    const imagePath = req.file ? '/uploads/' + req.file.filename : null;

    const turf = new TURF({
        turfName: req.body.turfName,
        categories: categories,
        amenities: amenities,
        rating: req.body.rating,
        address: req.body.address,
        price: req.body.price,
        image: imagePath,
    })

    await turf.save();
    return res.status(200).json({
        message:"Success! Recored added",
    });
}
async function getTurf(req,res){
    const turf = await TURF.find();
    if(!turf) return res.status(404).json({ message:"No Data Found" });
    return res.status(200).json(turf);
}

module.exports ={
    addTurf,getTurf
}