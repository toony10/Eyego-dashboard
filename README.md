# 🧿 Eyego Dashboard Platform

**Eyego Dashboard** is a modern web-based platform designed for managing products through a clean, responsive, and interactive admin panel. Built with cutting-edge technologies to ensure scalability, performance, and an exceptional user experience.

---

## 🚀 Features

- 🔐 User authentication via Firebase
- 🎨 Elegant and modular UI built with [ShadCN UI](https://ui.shadcn.com/)
- 📊 Interactive charts using Recharts
- ⚛️ State management with Redux Toolkit
- 🧩 Modular architecture with TypeScript and Next.js 15
- 💅 Tailwind CSS for fast and responsive styling

---

## 🔑 Test Credentials

You can log in using the following test account:

```
Email: justfortest@ex.com  
Password: 12345@aA
```

---

## 🛠️ Tech Stack

| Technology       | Purpose                              |
|------------------|---------------------------------------|
| Next.js 15       | React framework (App Router, SSR)     |
| TypeScript       | Static typing                         |
| Tailwind CSS     | Utility-first CSS framework           |
| ShadCN UI        | Accessible components on Tailwind     |
| Firebase Auth    | User authentication                   |
| Redux Toolkit    | State management                      |
| Recharts         | Data visualization                    |

---

## ⚙️ Getting Started

Follow these steps to run the project locally:

1. **Clone the repository**

   ```bash
   git clone https://github.com/toony10/Eyego-dashboard
   cd eyego-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   Navigate to: `http://localhost:3000`

---

## 📁 Project Structure

```bash
eyego-dashboard/
├── public/                  # Static assets (images, icons, etc.)
├── src/
│   ├── app/                 # Next.js app router structure
│   │   ├── dashboard/
│   │   │   ├── products/
│   │   │   └── statistics/
│   │   ├── firebase/        # Firebase auth configs
│   │   ├── login/           # Login page
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Entry page
│   ├── components/
│   │   ├── charts/          # Recharts components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   └── ui/              # UI elements (buttons, inputs...)
│   ├── data/                # Static data and constants
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions, services, helpers
│   ├── providers/           # Context and app providers
│   ├── store/               # Redux Toolkit slices & configuration
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions/helpers
│   ├── globals.css          # Global styles
│   └── middleware.ts        # Middleware logic
├── .env.local               # Environment variables
├── .gitignore
└── README.md
```

---

## 👤 Author

- **Name**: Anton amir 
- **GitHub**: [github.com/toony10](https://github.com/toony10)  
- **Email**: amiranton257@gmail.com