# 🔐 MERN Stack Authentication App

A complete, production-ready **MERN (MongoDB, Express, React, Node.js)** authentication system with JWT token-based security, user registration, login, and protected dashboard.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4-orange?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Auth-red)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## ✨ Features

- ✅ **User Registration** - Create accounts with email validation
- ✅ **Secure Login** - Password hashing with bcrypt
- ✅ **JWT Authentication** - Token-based stateless auth
- ✅ **Protected Routes** - Dashboard only for authenticated users
- ✅ **Responsive Design** - Mobile-friendly UI
- ✅ **Error Handling** - Client & server-side validation
- ✅ **Real-time Feedback** - Success/error messages
- ✅ **Production Ready** - Environment variables, CORS, security best practices

---

## 🎯 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/mern-auth.git
cd mern-auth
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
MONGO_URI=mongodb://localhost:27017/mern-auth
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
CORS_ORIGIN=http://localhost:3000
EOF

npm start
```

**Backend runs on**: `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

**Frontend runs on**: `http://localhost:3000`

---

## 🔑 How It Works

### Registration Flow
```
1. User enters Name, Email, Password
2. Frontend validates input
3. Backend checks for existing email
4. Password hashed with bcrypt
5. User saved to MongoDB
6. JWT token generated
7. Token stored in localStorage
8. Redirect to Dashboard
```

### Login Flow
```
1. User enters Email, Password
2. Backend finds user in database
3. Password verified with bcrypt
4. JWT token generated (7-day expiration)
5. Token stored in localStorage
6. Token included in all API requests
7. Redirect to Dashboard
```

### Protected Route Access
```
1. ProtectedRoute component checks for token
2. Token included in Authorization header
3. Backend middleware verifies JWT
4. If valid: access granted
5. If invalid/expired: redirect to login
```

---

## 📁 Project Structure

```
mern-auth/
├── 📁 frontend/
│   ├── 📁 public/
│   │   └── index.html
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   └── ProtectedRoute.js      # Route protection
│   │   ├── 📁 pages/
│   │   │   ├── Login.js               # Login page
│   │   │   ├── Register.js            # Registration page
│   │   │   ├── Dashboard.js           # Protected dashboard
│   │   │   └── Auth.css               # Styling
│   │   ├── 📁 services/
│   │   │   └── api.js                 # Axios instance + interceptors
│   │   ├── App.js                     # Main app with routes
│   │   └── index.js                   # React entry point
│   └── package.json
│
├── 📁 backend/
│   ├── 📁 config/
│   │   └── db.js                      # MongoDB connection
│   ├── 📁 controllers/
│   │   └── authController.js          # Auth business logic
│   ├── 📁 middleware/
│   │   └── authMiddleware.js          # JWT verification
│   ├── 📁 models/
│   │   └── User.js                    # User schema + methods
│   ├── 📁 routes/
│   │   └── authRoutes.js              # Auth endpoints
│   ├── server.js                      # Express server
│   ├── .env                           # Environment variables
│   └── package.json
│
└── 📄 Documentation/
    ├── README.md                      # This file
    ├── DEPLOYMENT_GUIDE.md            # Deploy to Render + Vercel
    ├── JWT_APIS_EXPLANATION.md        # JWT deep dive
    ├── PROJECT_DESCRIPTION.md         # Detailed project info
    └── QUICK_START.md                 # Quick setup guide
```

---

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ No |
| POST | `/api/auth/login` | Login user | ❌ No |
| GET | `/api/auth/me` | Get current user | ✅ Yes |

### Request Examples

#### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Get Current User (Protected)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🔐 Authentication Details

### JWT Token Structure
```
Header:    { "alg": "HS256", "typ": "JWT" }
Payload:   { "userId": "...", "iat": ..., "exp": ... }
Signature: HMACSHA256(header.payload, JWT_SECRET)
```

### Token Features
- **Expires in**: 7 days
- **Storage**: Browser localStorage
- **Included in**: Authorization header of every request
- **Format**: `Authorization: Bearer <token>`

### Password Security
- **Hashing**: bcrypt with 10 salt rounds
- **Minimum length**: 6 characters
- **Validation**: Confirmed on registration

---

## 🚀 Deployment

### Deploy Backend (Render)
1. Push code to GitHub
2. Create MongoDB Atlas database
3. Sign up on [render.com](https://render.com)
4. Connect GitHub repository
5. Set environment variables
6. Deploy

[Full Deployment Guide →](./DEPLOYMENT_GUIDE.md)

### Deploy Frontend (Vercel)
1. Push code to GitHub
2. Sign up on [vercel.com](https://vercel.com)
3. Import GitHub repository
4. Set environment variables
5. Deploy

---

## 📊 Tech Stack Details

### Frontend
- **React 18** - UI library with hooks
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **CSS3** - Responsive styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing (10 rounds)
- **jsonwebtoken** - JWT generation & verification
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing

### Database
- **MongoDB Atlas** (Cloud) or **Local MongoDB**
- **Mongoose** ODM for schema validation
- **Collections**: Users

---

## 🔒 Security Features

### Password Protection
```javascript
// Passwords hashed with bcrypt before saving
bcrypt.hash(password, 10)
```

### JWT Authentication
```javascript
// Stateless token-based security
jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
```

### CORS Configuration
```javascript
// Only allow requests from authorized domains
cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
})
```

### Input Validation
```javascript
// Email format validation
// Password confirmation check
// Unique email enforcement
// Minimum length requirements
```

### Environment Variables
```
Sensitive data stored in .env file
Not committed to version control
```

---

## 🧪 Testing Workflow

### 1. Register
- Go to `http://localhost:3000/register`
- Fill form (use any name/email)
- Password must be 6+ characters
- Click Register

### 2. Verify Success
- Should redirect to Dashboard
- User name displayed
- Token saved in localStorage

### 3. Test Protected Route
- Manually delete authToken from localStorage (DevTools)
- Refresh page
- Should redirect to login

### 4. Login
- Go to `http://localhost:3000/login`
- Enter registered email/password
- Should redirect to Dashboard

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check MongoDB is running
mongod --version

# Check port 5000 is available
netstat -ano | findstr :5000

# Verify environment variables
cat backend/.env
```

### Frontend can't reach backend
```bash
# Check backend is running on port 5000
curl http://localhost:5000

# Check CORS_ORIGIN matches frontend URL
# Update frontend API URL in services/api.js
```

### Login fails
```bash
# Check user is registered first
# Verify email/password are correct
# Check browser console for errors
# Check Network tab in DevTools
```

### Token not persisting
```bash
# Check browser localStorage
# DevTools → Storage → localStorage
# Verify token exists in localStorage
# Check Authorization header in requests
```

---

## 📚 Additional Documentation

- [JWT APIs Explanation](./JWT_APIS_EXPLANATION.md) - Deep dive into JWT authentication
- [Project Description](./PROJECT_DESCRIPTION.md) - Complete project details
- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Deploy to production
- [Quick Start](./QUICK_START.md) - Step-by-step setup

---

## 🎓 Learning Resources

- [MERN Stack Guide](https://www.mongodb.com/mern-stack)
- [JWT Introduction](https://jwt.io)
- [Express.js Docs](https://expressjs.com)
- [React Docs](https://react.dev)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 📝 Environment Variables

### Backend (.env)
```dotenv
# MongoDB Atlas connection string
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-auth

# JWT secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server configuration
PORT=5000
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📦 Dependencies

### Frontend
```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "axios": "^1.0.0"
}
```

### Backend
```json
{
  "express": "^4.18.0",
  "mongoose": "^7.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0",
  "dotenv": "^16.0.0",
  "cors": "^2.8.5"
}
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💡 Next Steps

1. **Extend Authentication**
   - Add password reset functionality
   - Implement OAuth (Google, GitHub)
   - Add two-factor authentication (2FA)

2. **Add Features**
   - User profile editing
   - Profile picture upload
   - Email verification

3. **Enhance Security**
   - Implement refresh tokens
   - Add rate limiting
   - Implement CSRF protection

4. **Scale Application**
   - Add more protected routes
   - Create API versioning
   - Implement caching

---

## 🙋 Support

For support, email support@example.com or open an issue on GitHub.

---

## 👏 Acknowledgments

- MongoDB for excellent documentation
- Express.js community
- React team for amazing UI library
- All contributors and users

---

**Made with ❤️ by Your Name**

⭐ Star this repository if it helped you!

---

## 📞 Contact

- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Email**: your.email@example.com
- **LinkedIn**: [Your Profile](https://linkedin.com/in/yourprofile)

---

Last Updated: December 2025
