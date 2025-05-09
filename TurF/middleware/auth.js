const jwt = require("jsonwebtoken");
const config = require("../config/jwt_config");

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Token is not available" }); // ✅ Fixed typo: "Tokel"
  }

  jwt.verify(token, config.secret_key, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" }); // ✅ Use 403 for forbidden access
    }

    req.user = decoded; // This will typically contain the userId or email you added in payload
    next();
  });
};
