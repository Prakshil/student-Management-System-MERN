<div align="center">

# 🎓 Student Management System

### *Because managing students shouldn't feel like herding cats* 🐱

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)](https://expressjs.com)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Documentation](#-api-documentation) • l

---

</div>

## 🤔 What's This All About?

So you want to manage students without losing your sanity? Welcome to the club! This full-stack MERN application is your new best friend for handling student data, profiles, and all that administrative jazz that keeps you up at night.

Built with modern tech (because who wants to work with legacy code from the Stone Age?), this system lets you:
- ✨ Add, edit, and delete student records (with actual validation, not just vibes)
- 🔐 Secure authentication via Incoming OTP feature as passwords are so 2010
- 📊 Beautiful dashboards that actually make sense
- 🎨 A UI so clean, Marie Kondo would approve
- 🚀 Fast, responsive, and doesn't crash when you need it most

## ✨ Features

### 🎯 Core Functionality
- **Student CRUD Operations** - Create, Read, Update, Delete. The four horsemen of data management.
- **OTP Authentication** - Email-based verification because we're fancy like that
- **Role-Based Access** - Students and Admins living in harmony (or at least in separate dashboards)
- **Profile Management** - Upload pictures, edit details, the whole shebang
- **Search & Filter** - Find that one student named "John" among 500 Johns

### 🔒 Security Features
- JWT-based authentication (tokens that actually work!)
- Bcrypt password hashing (your secrets are safe here)
- HTTP-only cookies (because XSS attacks aren't invited to this party)
- Input validation & sanitization (SQL injection? Not on my watch!)

### 🎨 UI/UX Goodies
- Responsive design (looks good on everything from an iPhone 5 to your 4K monitor)
- Dark mode support (for the night owls among us)
- Smooth animations (thanks Framer Motion!)
- Interactive charts (data visualization that doesn't hurt your eyes)
- Sidebar navigation (because getting lost in your own app is embarrassing)

## 🛠️ Tech Stack

### Frontend
```
React 19         → Because hooks are life
Vite            → Fast builds, faster vibes
TailwindCSS     → Styling without the pain
Shadcn/ui       → Components that don't suck
React Router    → SPA navigation magic
Axios           → HTTP requests made easy
Recharts        → Charts that actually chart
Framer Motion   → Animations that wow
```

### Backend
```
Node.js         → JavaScript on the server (who would've thought?)
Express.js      → Minimal and flexible (like yoga, but for APIs)
MongoDB         → NoSQL database (because relations are complicated)
Mongoose        → MongoDB ODM (taming the chaos)
JWT             → Stateless auth (no server memory issues here)
Nodemailer      → Sending emails like a boss
Bcrypt          → Password security 101
Cloudinary      → Image hosting in the cloud
```

## 🚀 Getting Started

### Prerequisites
Before you dive in, make sure you have:
- Node.js (v16 or higher - update if you're living in the past)
- MongoDB (local or Atlas - your choice, I'm not your boss)
- A Gmail account with App Password (for the OTP magic)
- Coffee ☕ (optional but highly recommended)

### Installation

#### 1. Clone this bad boy
```bash
git clone https://github.com/Prakshil/student-Management-System-MERN.git
cd student-Management-System-MERN
```

#### 2. Backend Setup
```bash
cd Backend
npm install

# Create your .env file (the secret sauce)
cp .env.example .env
```

Edit your `.env` file:
```env
# Server Config
PORT=5000
HOSTNAME=localhost
CORS_ORIGIN=http://localhost:3000

# Database (replace with your MongoDB URI)
DB_NAME=student_management
MONGODB_URL=mongodb://localhost:27017

# JWT Secret (make it strong, not "password123")
JWT_SECRET=your-super-secret-key-that-nobody-knows
JWT_EXPIRES_IN=7d

# SMTP Settings (for sending those OTPs)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
EMAIL_FROM=StudentMS <your-email@gmail.com>

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### 3. Frontend Setup
```bash
cd ../Frontend/student
npm install

# Create frontend .env
cp .env.example .env
```

Edit `Frontend/student/.env`:
```env
VITE_API_URL=http://localhost:5000
```

#### 4. Start the Engines 🚀
```bash
# Terminal 1 - Backend
cd Backend
npm start

# Terminal 2 - Frontend
cd Frontend/student
npm run dev
```

Visit `http://localhost:3000` and watch the magic happen ✨

### 🎯 Creating an Admin User
```bash
cd Backend
node scripts/createAdmin.js
```
Follow the prompts, and boom - you're the admin now.

## 📡 API Documentation

### Authentication Endpoints
```javascript
POST /api/auth/request-otp      // Request OTP for email
POST /api/auth/verify-otp       // Verify OTP and login
POST /api/auth/logout           // Logout (bye bye token)
```

### User Endpoints
```javascript
POST   /api/users/signup        // Register new user
POST   /api/users/login         // Login with credentials
GET    /api/users/:id           // Get user by ID
PUT    /api/users/:id           // Update user
DELETE /api/users/:id           // Delete user
```

### Student Endpoints (Admin Only)
```javascript
GET    /api/students            // Get all students
POST   /api/students            // Add new student
GET    /api/students/:id        // Get student by ID
PUT    /api/students/:id        // Update student
DELETE /api/students/:id        // Delete student
```

### Admin Endpoints
```javascript
GET    /api/admin/dashboard     // Admin dashboard stats
GET    /api/admin/users         // Get all users
```

## 🏗️ Project Structure
```
student-Management-System-MERN/
├── Backend/
│   ├── Config/           # Database config
│   ├── Controllers/      # Route controllers
│   ├── Middlewares/      # Auth, error handling, etc.
│   ├── Models/          # Mongoose schemas
│   ├── Routes/          # API routes
│   ├── utils/           # Helper functions
│   └── app.js           # Express app setup
│
└── Frontend/
    └── student/
        ├── src/
        │   ├── components/   # Reusable UI components
        │   ├── pages/        # Page components
        │   ├── context/      # React context providers
        │   ├── services/     # API service layer
        │   └── lib/          # Utilities
        └── public/           # Static assets
```

## 🔧 Environment Variables

### Backend Required Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URL` | MongoDB connection string | `mongodb://localhost:27017` |
| `JWT_SECRET` | Secret for JWT tokens | `super-secret-key` |
| `SMTP_HOST` | SMTP server host | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | `587` |
| `SMTP_USER` | Email address | `your@email.com` |
| `SMTP_PASS` | Email app password | `your-app-password` |

### Frontend Required Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000` |

## 🐛 Known Issues (We're Working On It!)
- Email delivery might be slow on free hosting tiers (patience is a virtue)
- Image uploads can be laggy on slow connections (blame the internet, not us)
- Dark mode toggle sometimes needs a refresh (we're not perfect, okay?)

## 🤝 Contributing

Found a bug? Want to add a feature? Think you can make this better?

1. Fork it
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Just don't break anything, please. We like our code like we like our coffee - working.

## 📝 License

MIT License - Go wild! (But give credit where credit is due)

## 👨‍💻 Author

**Prakshil Patel**
- GitHub: [@Prakshil](https://github.com/Prakshil)
- Email: prakshilmpatel@gmail.com

## 🙏 Acknowledgments

- Coffee, for keeping me awake during those 3 AM debugging sessions
- Stack Overflow, the real MVP
- My keyboard, for surviving my aggressive typing
- You, for actually reading this README till the end

---

<div align="center">

### Made with ❤️ and a concerning amount of caffeine

**If this project helped you, consider giving it a ⭐**

*Now go forth and manage those students!*

</div>
