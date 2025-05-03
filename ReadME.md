# Auth App

![Node.js](https://img.shields.io/badge/Node.js-14.x-green) ![Express](https://img.shields.io/badge/Express-4.x-black) ![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

---

## Overview

Auth App is a simple authentication and authorization API built with Node.js, Express, and MongoDB. It provides user signup, login, JWT-based authentication, and role-based access (student/admin).

## Features

- Secure user registration & login
- Password hashing with bcrypt
- JWT token generation & verification
- Role-based protected routes (Student/Admin)
- Cookie & header token support

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

```bash
# Clone the repo
git clone https://github.com/Singhdhiru/Auth-App.git
cd Auth-App

# Install dependencies
npm install
```

## Environment Variables

Create a `.env` file in the project root with:

```env
PORT=3000
MONGODB_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
```

## Usage

```bash
# Start the server
npm start
```

Server runs at `http://localhost:3000` by default.

## API Endpoints

### Public Routes
| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| POST   | `/api/v1/signup`   | Register a new user  |
| POST   | `/api/v1/login`    | Login & receive token |

### Protected Routes
| Method | Endpoint           | Role      |
| ------ | ------------------ | --------- |
| GET    | `/api/v1/student`  | student   |
| GET    | `/api/v1/admin`    | admin     |

#### Sample Requests
```bash
# Sign up
curl -X POST http://localhost:3000/api/v1/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","password":"P@ssw0rd","role":"student"}'

# Log in
curl -X POST http://localhost:3000/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"P@ssw0rd"}'

# Access student route
curl -X GET http://localhost:3000/api/v1/student \
  -H "Authorization: Bearer <your_jwt_token>"
```

## Folder Structure

```
Auth-App/
├── controllers/        # Route handlers
├── middlewares/        # Auth & role middleware
├── models/             # Mongoose schemas
├── routes/             # Express routers
├── .env                # Environment variables
├── package.json        # Project metadata
└── ReadME.md           # Project documentation
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

Created by [Singhdhiru](https://github.com/Singhdhiru) — feel free to connect!