# 🔐 Digital Guardians — Client

_Secure. Fast. Modern. — Now Fully Upgraded for 2025 🚀_

## 📢 What’s New in This Update

- Zod-based form validation with inline error messages.
- Safer, more maintainable and secure codebase.
- Centralized TypeScript type definitions for consistency.
- Code splitting implementation for improved performance.
- Structured and scalable folder architecture for growth.

## 🌟 Overview

The **Digital Guardians** Client is a high-performance, secure, and intuitive front-end for a full-stack password manager.  
It combines modern UI design with enterprise-grade security practices, making password management easy and safe.

## ✨ Core Features

- **Authentication** - Secure signup/login with validation & error handling.
- **Account Management** - Update profile & settings with instant feedback.
- **Password Vault** - Store, edit, delete, and search credentials.
- **Real-Time Data Sync** - Fast state updates using TanStack Query.
- **Strong Password Generator** - One-click generation of complex passwords.
- **Responsive UI** - Tailwind-powered, mobile-first design.

## 🛠 Tech Stack

| Layer      | Technology                             |
| ---------- | -------------------------------------- |
| Framework  | React 19 + TypeScript 5.7              |
| Routing    | React Router v7                        |
| State/Data | TanStack Query 5, React Hook Form, Zod |
| Styling    | Tailwind CSS 4, clsx, tailwind-merge   |
| HTTP       | Axios 1.8                              |
| Utils      | date-fns, React Icons                  |
| Build Tool | Vite 6                                 |
| Linting    | ESLint + TypeScript ESLint             |

## 📂 Folder Structure

```ini
client/
└── src/
    ├── assets/            # Static images and stylesheet
    ├── components/        # Reusable UI components
    ├── data/              # Static configuration/data
    ├── hooks/             # Custom React hooks
    ├── layouts/           # Layout wrappers for pages
    ├── libs/              # Shared library helpers
    ├── pages/             # Route-level components
    ├── schemas/           # Zod validation schemas
    ├── services/          # API service calls
    ├── types/             # Global TypeScript types
    ├── utilities/         # Utility/helper functions
    ├── App.tsx            # Main application component
    └── main.tsx           # Entry point for React app
```

## ⚙️ Getting Started

To get started with the development of the client-side, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/MohammadAsad-Weber/digital-guardians.git
   cd digital-guardians/client
   ```

2. **Install Dependencies**

   Install the necessary dependencies using npm:

   ```bash
   npm install
   ```

3. **Start the Development Server**

   To start the development server, run the following command:

   ```bash
   npm run dev
   ```

   > This will start the application on http://localhost:5173.

## 🌍 Environment Variables

You need to set up environment variables for the app to function correctly. Create a `.env.local` file in the root of the client folder and add the following:

```ini
VITE_BACKEND_URL=YOUR_BACKEND_URL
```

> This URL points to the server-side API.

## 🧪 Quality & Security

**Code Quality Check**
Run ESLint to ensure code consistency and detect potential issues:

```bash
npm run lint
```

**Security Recommendations**

- 🔒 Always use **HTTPS** for all API requests in production.
- 🛡 Implement a **Content Security Policy (CSP)** to mitigate XSS attacks.
- 🗝 Store sensitive production secrets in a **secure vault** rather than `.env` files.

## 📃 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Mohammad Asad  
Frontend Developer & MERN Stack Enthusiast

LinkedIn: [Mohammad Asad](https://www.linkedin.com/in/mohammad-asad-091b6a217/)  
Twitter: [@IronCodeNagi](https://twitter.com/IronCodeNagi)

> “Your passwords are only as strong as the vault that guards them. Digital Guardians makes sure that vault is bulletproof.”
