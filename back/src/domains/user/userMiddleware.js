import jwt from "jsonwebtoken";

class AuthMiddleware {
  /**
   * Middleware to verify JWT token from Authorization header
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next function
   */
  static verifyToken(req, res, next) {
    try {
      const authHeader = req.header("Authorization");

      // Check if Authorization header exists and starts with 'Bearer '
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        const error = new Error("Access denied");
        error.statusCode = 401;
        return next(error); // Pass error to Express error handler
      }

      // Extract JWT token from the Authorization header
      const token = authHeader.split(" ")[1];

      // Verify the token
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      next(err); // Pass any errors to the error handler middleware
    }
  }
}

export default AuthMiddleware;