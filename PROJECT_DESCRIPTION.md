# MERN Stack Authentication Application

## 📄 Project Description

A full-stack **MERN (MongoDB, Express, React, Node.js)** authentication system with JWT token-based security. This application demonstrates modern web development practices including user registration, secure login, JWT authentication, protected routes, and a professional dashboard.

---

## 🎯 Key Features

### User Authentication
- **User Registration**: Create new accounts with name, email, and password
- **Secure Login**: Password hashing using bcrypt
- **JWT Tokens**: Session management with 7-day expiration
- **Password Validation**: Minimum 6 characters, confirmation matching
- **Email Validation**: Format checking and uniqueness enforcement

### Security
- **Password Hashing**: Industry-standard bcrypt encryption
- **JWT Authentication**: Stateless token-based authorization
- **Protected Routes**: Dashboard only accessible to authenticated users
- **CORS Enabled**: Secure cross-origin communication
- **Environment Variables**: Sensitive data protection

### User Experience
- **Responsive Design**: Mobile-friendly CSS styling
- **Real-time Feedback**: Success and error messages
- **Form Validation**: Client-side and server-side validation
- **Protected Navigation**: Automatic redirection for unauthenticated users
- **Dashboard**: Personalized user information display

---

## 🏗️ Technology Stack

### Frontend
- **React 18**: UI library with hooks
- **React Router v6**: Client-side routing
- **Axios**: HTTP client for API calls
- **CSS3**: Responsive styling

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM (Object Document Mapper)
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT generation and verification
- **dotenv**: Environment variable management
- **CORS**: Cross-origin resource sharing

---

## 📁 Project Structure

```
mern-auth/
├── frontend/                 # React Frontend
│   ├── public/
│   │   └── index.html       # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.js    # Route guard component
│   │   ├── pages/
│   │   │   ├── Login.js     # Login page
│   │   │   ├── Register.js  # Registration page
│   │   │   ├── Dashboard.js # Protected dashboard
│   │   │   ├── Auth.css     # Auth pages styling
│   │   │   └── Dashboard.css# Dashboard styling
│   │   ├── services/
│   │   │   └── api.js       # Axios API instance
│   │   ├── App.js           # Main app component
│   │   ├── App.css          # Global styling
│   │   └── index.js         # React entry point
│   └── package.json
│
├── backend/                  # Express Backend
│   ├── config/
│   │   └── db.js            # MongoDB connection
│   ├── controllers/
│   │   └── authController.js# Auth logic
│   ├── middleware/
│   │   └── authMiddleware.js# JWT verification
│   ├── models/
│   │   └── User.js          # User schema
│   ├── routes/
│   │   └── authRoutes.js    # Auth endpoints
│   ├── server.js            # Express server
│   ├── .env                 # Environment variables
│   └── package.json
│
└── Documentation files      # Guides and README
```

---

## 🔐 Authentication Flow

### Registration Flow
1. User enters name, email, password, confirm password
2. Frontend validates form (email format, password match)
3. POST request to `/api/auth/register`
4. Backend validates data and checks for existing email
5. Password hashed with bcrypt
6. User saved to MongoDB
7. JWT token generated and returned
8. Token stored in browser localStorage
9. User redirected to dashboard

### Login Flow
1. User enters email and password
2. Frontend validates inputs
3. POST request to `/api/auth/login`
4. Backend finds user by email
5. Password compared with hashed version using bcrypt
6. If valid, JWT token generated
7. Token returned to frontend
8. Token stored in localStorage
9. User redirected to dashboard

### Protected Route Access
1. Frontend checks if token exists in localStorage
2. Token added to every request header: `Authorization: Bearer <token>`
3. Backend middleware verifies token signature and expiration
4. If valid, user ID extracted and attached to request
5. Route handler processes request
6. If invalid, 401 Unauthorized response sent

---

## 🔌 API Endpoints

### Authentication Endpoints

#### POST `/api/auth/register`
**Description**: Register a new user

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "User registered successfully!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

#### POST `/api/auth/login`
**Description**: Login user

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Login successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

#### GET `/api/auth/me`
**Description**: Get current user (Protected Route)

**Headers Required**:
```
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## 🚀 Getting Started

### Local Development

#### 1. Backend Setup
```bash
cd backend
npm install
# Create .env file with required variables
npm start
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```

#### 3. Access Application
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api`

### Deployment
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for Render (backend) and Vercel (frontend) deployment instructions.

---

## 👤 User Model

```javascript
{
  _id: ObjectId,
  name: String (required, min 2 chars),
  email: String (required, unique, validated),
  password: String (hashed, min 6 chars),
  createdAt: Date (auto-generated)
}
```

---

## 📊 Data Flow

```
[User Browser]
    ↓
[React App] ← Axios Calls → [Express Server]
    ↓                              ↓
[localStorage]                [MongoDB]
(token storage)               (user data)
```

---

## 🔒 Security Considerations

- **Password Hashing**: All passwords hashed with bcrypt salt rounds = 10
- **JWT Secrets**: Should be strong random strings (minimum 32 characters)
- **Token Expiration**: 7 days to balance security and usability
- **CORS Restrictions**: Only allow requests from authorized frontend domain
- **Environment Variables**: Sensitive data not hardcoded
- **Input Validation**: Both client-side and server-side
- **HTTPS**: Required in production (Render & Vercel provide SSL)

---

## 📝 Example Usage

### Register Account
```
1. Visit http://localhost:3000/register
2. Fill form: Name, Email, Password
3. Click "Register"
4. Auto-redirects to Dashboard
```

### Login to Account
```
1. Visit http://localhost:3000/login
2. Enter Email and Password
3. Click "Login"
4. Token saved automatically
5. Redirected to Dashboard
```

### Access Protected Dashboard
```
1. Dashboard only accessible if authenticated
2. Token required in localStorage
3. Displays user name and email
4. Logout option available
```

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Ensure MongoDB is running and connection string is correct |
| CORS error | Verify CORS_ORIGIN matches frontend URL |
| Login fails | Check user is registered, email format, password length |
| Token not persisting | Clear localStorage, check browser storage enabled |
| Page redirects on load | Verify token exists in localStorage for protected routes |

---

## 📄 License

MIT License - Feel free to use for educational and commercial purposes.

---

## 👨‍💻 Developer

Created as a MERN stack demonstration project showcasing:
- Full authentication system
- JWT token-based security
- Protected route implementation
- Professional code structure
- Error handling
- Production-ready practices
