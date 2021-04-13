// Format of Token
// Authorization: Bearer <access_token>

// Verify Token
const verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers.authorization;
  // Check if bearer exists
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get Token
    const bearerToken = bearer[1];
    // Set token
    req.token = bearerToken;
    // Next Middleware
    next();
  } else {
    // Forbidden
    res.status(403).json({
      message: 'Invalid Token',
    });
  }
};

module.exports = verifyToken;
