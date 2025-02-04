import request from "supertest";
import express from "express";
import dotenv from "dotenv";
import userRoutes from "../src/domains/user/userRoutes.js";
import Database from "../src/config/db.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/user", userRoutes);

beforeAll(async () => {
    await Database.connect();
});

afterAll(async () => {
    await Database.disconnect();
});

describe("User API Tests", () => {
    let authToken;

    test("Accessing /user/status without token should return 401", async () => {
        const response = await request(app).get("/user/status");
        expect(response.status).toBe(401);
    });

    test("User login with valid credentials should return a token", async () => {
        const response = await request(app)
            .post("/user/login")
            .send({ username: "testuser", password: "password123" });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
        authToken = response.body.token;
    });

    test("Accessing /user/status with valid token should return user list", async () => {
        const response = await request(app)
            .get("/user/status")
            .set("Authorization", `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
