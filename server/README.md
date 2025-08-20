# 🛡️ Digital Guardians – Backend (TypeScript Edition)

Digital Guardians is a secure backend system for a full-stack password manager, now fully migrated to **TypeScript** for improved maintainability, reliability, and developer experience.

This backend handles **user authentication**, **password encryption**, **secure token management**, and **email-based password recovery** — all implemented using modern security practices and built with the **MERN stack**.

## 🔁 TypeScript Migration Highlights

- Full codebase rewritten in TypeScript.
- Modular typing with centralized types directory.
- Strong input validation using Zod schemas.
- Cleaner, safer refactoring with static typing.
- Improved maintainability and code readability.

## 💡 Core Features

- JWT-based access & refresh token authentication.
- Bcrypt password hashing.
- AES-256 encrypted password storage with unique IVs.
- Password reset via email with secure token.
- HttpOnly cookie token storage.
- Express middlewares: Helmet, CORS, rate limiting.
- Zod schema validation.
- Modular file structure for scalability.
- Fully type-safe API logic.

## 🛠 Tech Stack

| Purpose       | Technology                           |
| ------------- | ------------------------------------ |
| Runtime       | Node.js (v20+)                       |
| Web Framework | Express.js                           |
| Language      | **TypeScript**                       |
| Database      | MongoDB + Mongoose ODM               |
| Auth          | JWT, bcrypt, cookie-parser           |
| Email         | Nodemailer (Gmail SMTP)              |
| Security      | Helmet, rate-limit, encryption utils |
| Validation    | **Zod**                              |
| Environment   | dotenv                               |

## 📁 Folder Structure (Post-Migration)

```ini
src/
├── controllers/       # Route logic
├── email/             # Email templates & utilities
├── middlewares/       # Express middlewares
├── models/            # Mongoose schemas (typed)
├── routes/            # API routes (typed)
├── types/             # Global/custom TS types
├── utilities/         # Helpers (encryption, tokens)
├── zod-schemas/       # Request validation with Zod
└── index.ts           # Main server entry
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
    # Application Configuration
    NODE_ENV=YOUR_NODE_ENV
    FRONTEND_URL=YOUR_FRONTEND_URL

    # Database
    DATABASE_URL=YOUR_DATABASE_URL

    # Email Configuration
    EMAIL_USER=YOUR_EMAIL_USER
    EMAIL_PASS=YOUR_EMAIL_PASS

    # Authentication & Security
    ENCRYPTION_SECRET=YOUR_ENCRYPTION_SECRET
    ACCESS_TOKEN_SECRET=YOUR_ACCESS_TOKEN_SECRET
    REFRESH_TOKEN_SECRET=YOUR_REFRESH_TOKEN_SECRET
    RESET_TOKEN_SECRET=YOUR_RESET_TOKEN_SECRET
    ```

    > ⚠️ **ALERT**: ENCRYPTION_SECRET Must be 64 hex characters (32 bytes).

4.  **Run the server**

    ```bash
    # Start the development server
    npm run dev

    # Build and run production
    npm run build
    npm start
    ```

    The server will be accessible at `http://localhost:3000` or at the port defined in the `.env` configuration file.

## 📡 API Overview

### 🔐 Auth Routes (`/auth`)

| Method | Endpoint                 | Description              |
| ------ | ------------------------ | ------------------------ |
| POST   | `/signup`                | Register a new user      |
| POST   | `/login`                 | Authenticate user        |
| POST   | `/forgot-password`       | Send reset email         |
| PATCH  | `/reset-password/:token` | Reset password via token |
| GET    | `/refresh`               | Refresh JWT token        |
| DELETE | `/logout`                | Logout and clear token   |

### 👤 Account Routes (`/account`)

| Method | Endpoint    | Description                                 |
| ------ | ----------- | ------------------------------------------- |
| GET    | `/profile`  | Get current user's data                     |
| PATCH  | `/profile`  | Update user profile (username and/or email) |
| PATCH  | `/password` | Change password                             |
| DELETE | `/profile`  | Delete user account                         |

### 🔑 Password Routes (`/api/passwords`)

| Method | Endpoint | Description                  |
| ------ | -------- | ---------------------------- |
| GET    | `/:id`   | Retrieve one password by ID  |
| GET    | `/`      | Get all stored passwords     |
| POST   | `/`      | Create a new password record |
| PATCH  | `/:id`   | Update password              |
| DELETE | `/:id`   | Delete password              |

## 🛡️ Security Highlights

- **Helmet** – Secure HTTP headers (CSP, XSS, etc.).
- **Rate Limiting** – Prevent brute-force attacks.
- **Zod** – Input validation + sanitization.
- **JWT + Refresh Tokens** – Secure session management.
- **HttpOnly Cookies** – Mitigates XSS attacks.
- **AES-256 Encryption** – Passwords encrypted at rest.
- **Bcrypt** – One-way password hashing.
- **CORS** – Restricted origins + credentials.

## 🧪 Postman Collection

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/43160558-77b173b0-0f91-4114-bb05-401beff4c829?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D43160558-77b173b0-0f91-4114-bb05-401beff4c829%26entityType%3Dcollection%26workspaceId%3D147fa808-9df7-4757-a21b-2c96f89452ee)

## 📃 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Mohammad Asad  
Frontend Developer & MERN Stack Enthusiast

LinkedIn: [Mohammad Asad](https://www.linkedin.com/in/mohammad-asad-091b6a217/)  
Twitter: [@IronCodeNagi](https://twitter.com/IronCodeNagi)

> “Your passwords are only as strong as the vault that guards them. Digital Guardians makes sure that vault is bulletproof.”
