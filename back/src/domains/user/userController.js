class UserController {

  /**
   * @param {Object} userService - An instance of the UserService that handles the business logic.
   */
  constructor(userService) {
    this.userService = userService;
  }

  /**
   * - If authentication is successful, returns a JWT token.
   * - Errors are passed to the Express error handler.
   * 
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      const token = await this.userService.authenticateUser(username, password);

      if (!token) {
        const error = new Error("Invalid credentials");
        error.statusCode = 400;
        throw error;
      }

      res.json({ token });
    } catch (err) {
      next(err); // Forward error to Express error handling middleware
    }
  }

  async getStatus(req, res, next) {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;