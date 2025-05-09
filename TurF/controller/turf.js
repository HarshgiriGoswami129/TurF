const TURF = require("../models/turf");

async function addTurf(req, res) {
  try {
    const categories = Array.isArray(req.body.categories)
      ? req.body.categories
      : JSON.parse(req.body.categories);

    const amenities = Array.isArray(req.body.amenities)
      ? req.body.amenities // ✅ FIX: Was incorrectly using `req.body.categories` again
      : JSON.parse(req.body.amenities);

    const imagePath = req.file ? '/uploads/' + req.file.filename : null;

    const turf = new TURF({
      turfName: req.body.turfName,
      categories: categories,
      amenities: amenities,
      rating: req.body.rating,
      address: req.body.address,
      price: req.body.price,
      image: imagePath,
    });

    await turf.save();

    return res.status(201).json({
      message: "Success! Record added",
      turf
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while adding turf",
      error: error.message
    });
  }
}

async function getTurf(req, res) {
  try {
    const turfs = await TURF.find();
    if (!turfs || turfs.length === 0) {
      return res.status(404).json({ message: "No Data Found" });
    }
    return res.status(200).json(turfs);
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching turfs",
      error: error.message
    });
  }
}

module.exports = {
  addTurf,
  getTurf
};
