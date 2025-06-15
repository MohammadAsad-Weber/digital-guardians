# 🛡️ Digital Guardians - Backend

Digital Guardians is a secure backend system for a full-stack password manager application built using the MERN stack. This server handles user authentication, encrypted password storage, and core password management operations. It follows modern security best practices with Helmet, rate limiting, JWT-based authentication, and bcrypt password hashing.

## 💡 Features

- User authentication with JWT
- Password hashing using bcrypt
- HttpOnly cookie-based token storage
- Encrypted Password Storage
- Nodemailer to send password reset emails
- Rate limiting to prevent abuse
- Helmet integration for HTTP header protection
- Modular file structure for scalability

## 🛠 Tech Stack

- **Node.js** – _Backend runtime environment_
- **Express.js** – _Web application framework_
- **MongoDB** – _NoSQL database_
- **Mongoose** – _ODM for MongoDB_
- **Bcrypt** – _Secure password hashing_
- **JWT** – _Token-based authentication_
- **nodemailer** – _Email service for sending password reset emails_
- **cookie-parser** – _Cookie support for storing JWT_
- **Helmet** – _Secure HTTP headers_
- **express-rate-limit** – _Rate limiting middleware_
- **CORS** – _Cross-origin request handling_
- **dotenv** – _Environment variable management_

## 📁 Folder Structure

```ini
server/
    ├── email/                 # Email templates
    ├── middlewares/           # Custom middlewares
    ├── models/                # MongoDB document schemas
    ├── routes/                # API route definitions
    ├── utilities/             # Utility functions
    ├── .env                   # Environment variables
    ├── index.js               # Main server entry point
```

## ⚙️ Getting Started

1.  **Clone the repository**

    ```bash
    git clone https://github.com/MohammadAsad-Weber/digital-guardians.git
    cd digital-guardians/server
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Configure environment variables**

    Create a `.env` file in the `server/` root:

    ```ini
    NODE_ENV=YOUR_NODE_ENV
    MONGO_URI=YOUR_MONGO_URI
    FRONTEND_URL=YOUR_FRONTEND_URL
    EMAIL_USER=YOUR_EMAIL_USER
    EMAIL_PASS=YOUR_EMAIL_PASS
    ENCRYPTION_SECRET=YOUR_ENCRYPTION_SECRET
    RESET_TOKEN_SECRET=YOUR_RESET_TOKEN_SECRET
    ACCESS_TOKEN_SECRET=YOUR_ACCESS_TOKEN_SECRET
    REFRESH_TOKEN_SECRET=YOUR_REFRESH_TOKEN_SECRET
    ```

    ⚠️ **ALERT**: ENCRYPTION_SECRET Must be 64 hex characters (32 bytes).

4.  **Run the server**

    ```bash
    npm run dev
    ```

    The server will be accessible at `http://localhost:3000` or at the port defined in the `.env` configuration file.

## 🔌 API Endpoints

### Auth Routes

- `POST /api/auth/signup` – Register a new user
- `POST /api/auth/login` – Authenticate and issue token
- `POST /api/auth/forgot-password` – Generate a reset password link
- `POST /api/auth/reset-password/:resetToken` – Reset the user password
- `GET /api/auth/refresh` – Refresh authentication token
- `DELETE /api/auth/logout` – Logout and invalidate token

### Password Routes

- `GET /api/passwords` – List all saved passwords
- `GET /api/passwords/:id` – Get specific password by ID
- `POST /api/passwords` – Create a new password entry
- `PUT /api/passwords/:id` – Update specific password by ID
- `DELETE /api/passwords/:id` – Delete specific password by ID

### User Routes

- `GET /api/account` – Get current user profile
- `PUT /api/account` – Update current user profile
- `PUT /api/account/password` – Change current user password
- `DELETE /api/account` – Delete current user account

### Click here to open Postman Collection

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/43160558-c19885df-b133-48f7-8450-b4f4d0d37992?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D43160558-c19885df-b133-48f7-8450-b4f4d0d37992%26entityType%3Dcollection%26workspaceId%3D147fa808-9df7-4757-a21b-2c96f89452ee)

## 🔒 Security Best Practices Used

- `helmet()` to set secure HTTP headers (XSS, clickjacking, CSP, etc.)
- `express-rate-limit` to prevent brute-force attacks
- `bcrypt` for one-way password hashing
- `jsonwebtoken` stored in HttpOnly cookies
- `cors` with allowed origins and credentials
- Proper status codes and error handling
- Input validation and sanitization at controller level

## 📃 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Mohammad Asad  
Frontend Developer & MERN Stack Enthusiast  

LinkedIn: [Mohammad Asad](https://www.linkedin.com/in/mohammad-asad-091b6a217/)  
Twitter: [@IronCodeNagi](https://twitter.com/IronCodeNagi) 

> “Your passwords are only as strong as the vault that guards them. Digital Guardians makes sure that vault is bulletproof.”
