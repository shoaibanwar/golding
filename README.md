# Project Documentation

## Implementation Overview

This project consists of two main parts: the **backend** and the **frontend**.

### Backend

The backend is built with **Node.js** and **Express**, following the **Domain-Driven Design (DDD)** architecture. In this approach, the application is divided into domains where each domain manages its own business logic. For this project:

- **User Domain**: All functionality related to user management resides in the `user` domain.
- **Routes**: The `userRouter` handles all user-related routes and delegates the business logic to the respective controller. It also injects services responsible for business operations.
- **Middlewares**:
  - One layer handles errors specific to the user domain.
  - Another layer handles general errors that could occur throughout the application.
- **Seeder**: A script is provided to seed the database with sample data for testing.
- **Testing**: Basic test coverage is implemented for key API endpoints.

### Frontend

The frontend is built using **React** and **Vite**, with two main components:

- **Login Component**: Handles user login.
- **Status Component**: Displays the status of the currently authenticated user.

## Installation Guide

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18+ recommended)
- **MongoDB** (running locally or using a cloud database like MongoDB Atlas)

### Backend Setup

1. **Clone the repository**

   ```sh
   git clone <repo-url>
   cd back
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Create a `.env` file** in the `back` directory and add:

   ```env
   MONGO_URI=mongodb://localhost:27017/golding
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

4. **Seed the database with test users**

   ```sh
   npm run seed
   ```

5. **Start the backend server**
   ```sh
   npm start
   ```
   The server should be running on `http://localhost:5000`.

#### Running Tests

##### Install test dependencies:

```sh
npm install --save-dev jest supertest dotenv
```

##### Run tests:

```sh
npm test
```

##### Included Tests:

1. Successful login returns a valid token.
2. Accessing `/user/status` without authentication fails.
3. Accessing `/user/status` with a valid token returns user data.

---

### Frontend Setup

1. **Navigate to the frontend folder**

   ```sh
   cd ../front
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Start the frontend server**
   ```sh
   npm run dev
   ```
   The React app should be running on `http://localhost:5173`.

---

## API Endpoints

### Authentication (Login)

- **Endpoint:** `POST /user/login`
- **Request Body:**
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "jwt_token_here"
  }
  ```

### Get User Status

- **Endpoint:** `GET /user/status`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token_here"
  }
  ```
- **Response:**
  ```json
  [
    {
      "username": "testuser",
      "fullName": "Test User",
      "email": "testuser@example.com",
      "role": "admin"
    }
  ]
  ```

---

## Folder Structure

```
root/
│── back/                  # Backend (Node.js + Express + MongoDB)
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── domains/       # Domain-driven modules
│   │   ├── middleware/    # Error handlers & authentication middleware
│   │   ├── index.js       # Main entry point
│   │   ├── seeder.js      # Data seeder
│   ├── package.json       # Backend dependencies
│   ├── .env               # Environment variables
│── front/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main application
│   │   ├── main.jsx       # Entry point
│   ├── package.json       # Frontend dependencies
│   ├── index.html         # Root HTML file
```

---

## Notes

- **Security Considerations:**

  - Passwords are stored using **bcryptjs** for encryption.
  - The authentication system uses **JWT tokens**.

- **Future Improvements:**
  - Implementation of refresh tokens.
  - More test coverage

---
