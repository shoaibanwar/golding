// Service layer responsible for handling business logic related to user authentication and retrieval.
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./userModel.js";

class UserService {

  /**
   * @param {string} username - The username entered by the user.
   * @param {string} password - The password entered by the user.
   * @returns {string|null} JWT token if authentication is successful, otherwise `null`.
   */
  async authenticateUser(username, password) {
    const user = await User.findOne({ username });
    if (!user) return null;

    // Compare provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    // Generate JWT token with user ID payload
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
  }

  /**
   * @returns {Promise<Array>} A list of user objects without passwords.
   */
  async getAllUsers() {
    return await User.find().select("-password");
  }
}

export default UserService;