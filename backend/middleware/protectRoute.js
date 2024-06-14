import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
  try {
    // Check if the JWT token is present in cookies
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No Token Provided" });
    }

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // Handle token expiration or invalid token errors
      const errorMessage = err.name === 'TokenExpiredError' ? 'Unauthorized - Token Expired' : 'Unauthorized - Invalid Token';
      return res.status(401).json({ error: errorMessage });
    }

    // Find the user by the decoded token's userId
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach user to the request object
    req.user = user;

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
