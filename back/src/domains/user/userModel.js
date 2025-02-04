// User schema definition using Mongoose
import mongoose from "mongoose";

class UserModel {
  constructor() {
    const schema = new mongoose.Schema({
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      fullName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      role: { type: String, required: true },
    });
    this.model = mongoose.model("User", schema);
  }

  getModel() {
    return this.model;
  }
}

export default new UserModel().getModel();