import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Database from "./config/db.js";
import User from "./domains/user/userModel.js";

dotenv.config();

const createFakeUser = async (username = faker.internet.username(), password = faker.internet.password(12)) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return {
    username,
    password: hashedPassword,
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(["user", "admin"]),
  };
};

const seedDatabase = async () => {
  try {
    await Database.connect();
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    console.log("Existing users deleted");

    const users = [];
    users.push(await createFakeUser("testuser", "password123")); // Add a test user
    for (let i = 0; i < 5; i++) { // Generate 5 fake users
      users.push(await createFakeUser());
    }

    await User.insertMany(users);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await Database.disconnect();
  }
};

seedDatabase();