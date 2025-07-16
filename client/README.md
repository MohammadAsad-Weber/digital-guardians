# 🔐 Digital Guardians - Client

Welcome to the **client-side** of the **Digital Guardians** password manager web application. This is a full-stack web app built with the **MERN stack** (MongoDB, Express, React, Node.js). The client-side is developed using **React**, **TypeScript**, and **Tailwind CSS** to provide a responsive, user-friendly interface.

## 💡 Features

- **Authentication**: Users can sign in and log in securely.
- **User Management**: Users can manage their account settings and profile.
- **Password Management**: Users can store, view, and manage their passwords.
- **Random Password Generator**: Generate strong random passwords for your accounts.

## 🛠 Technologies Used

- **React.js** - For building the user interface.
- **TypeScript** - For type safety and better development experience.
- **Tailwind CSS** - For responsive and modern UI styling.
- **React Router** - For client-side routing and navigation.
- **TanStack Query** - For efficient data fetching and caching.

## 📂 Folder Structure

Here is an overview of the folder structure:

```ini
client/
├── src/                   # Source code
│   ├── assets/            # Static assets
│   ├── components/        # Reusable UI components
│   ├── data/              # Static data
│   ├── hooks/             # Custom hooks for logic
│   ├── layouts/           # Layout components
│   ├── pages/             # Page components
│   ├── utilities/         # Utility function
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Entry point for React application
└── .env.local             # Environvent variables
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

This will start the application on `http://localhost:5173`.

## 🌍 Environment Variables

You need to set up environment variables for the app to function correctly. Create a `.env.local` file in the root of the client folder and add the following:

```ini
VITE_BACKEND_URL=YOUR_BACKEND_URL
```

_This URL points to the server-side API._

## 📃 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Mohammad Asad  
Frontend Developer & MERN Stack Enthusiast

LinkedIn: [Mohammad Asad](https://www.linkedin.com/in/mohammad-asad-091b6a217/)  
Twitter: [@IronCodeNagi](https://twitter.com/IronCodeNagi)

> “Your passwords are only as strong as the vault that guards them. Digital Guardians makes sure that vault is bulletproof.”
