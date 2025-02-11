const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token?.startsWith("Bearer ")) {
      token = token.slice(7).trim();
    }

    if (!token) {
      return res
        .status(400)
        .json({ message: "Authorization header is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded || !decoded.email || !decoded.id) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const user = await UserModel.findOne({
      _id: decoded.id,
      email: decoded.email,
    }).lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({
      message: "Unauthorized - Invalid or expired token",
    });
  }
};
