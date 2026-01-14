const { verifyToken } = require("../utils/jwt");

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  // Authorization header missing
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      error: "Authorization header missing",
    });
  }

  // Expected format: Bearer <token>
  const parts = authHeader.split(" ");
  // Token missing after Bearer
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({
      success: false,
      error: "Token missing after Bearer",
    });
  }

  const token = parts[1];

  try {
    // Verify token
    const decoded = verifyToken(token);

    // Attach user to request
    req.user = {
      userId: decoded.userId,
      username: decoded.username,
    };

    next();
  } catch (error) {
    // Token invalid
    return res.status(401).json({
      success: false,
      error: "Token invalid",
    });
  }
}

module.exports = authMiddleware;
