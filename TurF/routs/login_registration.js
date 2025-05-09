const exress = require('express');
const { registrationUser, getUser, loginUser } = require("../controller/login_registration");
const router = exress.Router();
const authMiddleware = require('../middleware/auth');

router.post("/registration",registrationUser);
router.post("/login",loginUser);
router.get("/users",authMiddleware,getUser);

module.exports = router;