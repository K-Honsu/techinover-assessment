# Techinnover API Documentation

## Overview

The Techinnover API is a backend service built using NestJS, designed to manage users, products, and authentication. The API includes features such as user authentication, product management, and role-based access control. This service also incorporates caching, rate limiting, and in-memory data handling for optimal performance.

## Objectives

- **User Management:** Handle user registration, login, and role-based access control.
- **Product Management:** Manage products with features like creation, retrieval, and status toggling.
- **Authentication:** Secure endpoints using JWT and role-based guards.
- **Performance Enhancements:** Implement in-memory caching for frequently accessed data and rate limiting to prevent abuse.
- **API Documentation:** Use Swagger for comprehensive API documentation.

## Features

- **Authentication:** Supports user registration and login with JWT-based authentication.
- **Role Management:** Provides role-based access control for different endpoints.
- **Product Handling:** CRUD operations on products, with the ability to toggle approval and ban statuses.
- **In-Memory Caching:** Implements caching for GET requests to improve performance.
- **Rate Limiting:** Limits the number of requests to prevent abuse.

## Getting Started

### Prerequisites

Before you can set up the development environment, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) (version 6.x or later)
- [pnpm](https://pnpm.io) (version 6.x or later)
- [MongoDB](https://www.mongodb.com/) (Ensure MongoDB is running locally or provide a remote connection URI)

### Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/K-Honsu/techinover-assessment.git
cd techinover-assessment
```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

```bash
NODE_ENV=
PORT=
DB_URI=
JWT_SECRET=

OR

Run the command: cp .env.example .env
```

4. **Run the MongoDB server:**

```bash
Ensure MongoDB is running on your system or connected to a remote MongoDB instance.
```

### Running the Application Locally

To run the application locally, follow these steps:

1. **Start the NestJS application:**

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

The application should now be running on http://localhost:3000.

2. **Access Swagger API Documentation:**
   Once the application is running, you can access the API documentation at http://localhost:3000/api.

## Project Structure

The project follows a modular structure typical for NestJS applications:

- src/: Contains the main application code.
  - auth/: Authentication module for handling sign-in and sign-up.
  - users/: User module for managing users.
  - products/: Product module for managing product-related operations.
  - common/: Contains shared utilities, guards, and pipes.
  - config/: Configuration files for environment management.

## API Overview

The API is organized into several modules:

- Auth Module:
  - POST /auth/signup: Register a new user.
  - POST /auth/signin: Log in with existing credentials.
- Users Module:
  - GET /users: Retrieve a list of users (Admin only).
  - PATCH /users/toggle-status: Toggle the ban status of a user (Admin only).
- Products Module:
  - GET /products: Retrieve a list of approved products.
  - POST /products: Create a new product (User only).
  - PATCH /products/toggle-status: Toggle the approval status of a product (Admin only).

## Caching and Performance

- The application uses in-memory caching for frequently accessed endpoints to improve response times. For example, the product list is cached to minimize database queries. The cache TTL (Time to Live) is configured to 10 minutes by default.

## Rate Limiting

- Rate limiting is applied globally using the ThrottlerModule. Each IP address is limited to 10 requests per minute.

## Contributing

- If you'd like to contribute to the project, please follow these steps:

- Fork the repository.
- Create a new branch (git checkout -b feature/your-feature-name).
- Make your changes.
- Commit your changes (git commit -am 'Add some feature').
- Push to the branch (git push origin feature/your-feature-name).
- Create a new Pull Request.

License
This project is licensed under the MIT License - see the LICENSE file for details.
