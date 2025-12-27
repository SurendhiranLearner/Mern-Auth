# MERN Stack User Registration & Login Application
## Complete Setup & Running Guide

---

## 📋 PROJECT STRUCTURE

```
mern-auth-app/
 ├── backend/
 │   ├── config/
 │   │   └── db.js                 (MongoDB connection)
 │   ├── models/
 │   │   └── User.js               (User schema and model)
 │   ├── routes/
 │   │   └── authRoutes.js          (API endpoints)
 │   ├── controllers/
 │   │   └── authController.js      (Business logic)
 │   ├── middleware/
 │   │   └── authMiddleware.js      (JWT verification)
 │   ├── server.js                  (Main server file)
 │   ├── .env                       (Environment variables)
 │   └── package.json               (Dependencies)
 │
 └── frontend/
     ├── public/
     │   └── index.html             (HTML template)
     ├── src/
     │   ├── components/
     │   │   └── ProtectedRoute.js   (Auth protection)
     │   ├── pages/
     │   │   ├── Login.js            (Login page)
     │   │   ├── Register.js         (Register page)
     │   │   ├── Dashboard.js        (Protected page)
     │   │   ├── Auth.css            (Auth styles)
     │   │   └── Dashboard.css       (Dashboard styles)
     │   ├── services/
     │   │   └── api.js              (API calls)
     │   ├── App.js                  (Main app component)
     │   ├── App.css                 (Global styles)
     │   ├── index.js                (React entry point)
     │   └── package.json            (Dependencies)
     └── index.html                  (HTML template)
```

---

## ⚙️ PREREQUISITES

Before starting, make sure you have:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** running locally or MongoDB Atlas account
- A code editor (VS Code recommended)

---

## 🚀 INSTALLATION & SETUP

### Step 1: Install Backend Dependencies

```bash
# Navigate to backend directory
cd backend

# Install all required npm packages
npm install

# Expected output: Successfully installed all packages
```

**What gets installed:**
- `express` - Backend framework
- `mongoose` - MongoDB object modeling
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT tokens
- `cors` - Cross-origin requests
- `dotenv` - Environment variables
- `nodemon` - Auto-reload in dev mode

---

### Step 2: Configure Backend Environment

The `.env` file is already created. Update it if needed:

**File:** `backend/.env`

```env
# MongoDB Connection String
# For local MongoDB: mongodb://localhost:27017/mern-auth
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/mern-auth
MONGO_URI=mongodb://localhost:27017/mern-auth

# JWT Secret Key (use a strong random string in production)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Port
PORT=5000

# CORS Origin (Frontend URL)
CORS_ORIGIN=http://localhost:3000
```

**How to change MONGO_URI:**

**Option A: Local MongoDB**
```
MONGO_URI=mongodb://localhost:27017/mern-auth
```
(Requires MongoDB installed locally)

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/mern-auth`
5. Update `MONGO_URI` in `.env`

---

### Step 3: Install Frontend Dependencies

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install all required npm packages
npm install

# Expected output: Successfully installed all packages
```

**What gets installed:**
- `react` & `react-dom` - React library
- `react-router-dom` - Client-side routing
- `axios` - HTTP client
- `react-scripts` - Build tools

---

## ▶️ RUNNING THE APPLICATION

### Start MongoDB (if using local)

**Windows:**
```bash
mongod
```

**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

---

### Start Backend Server

Open a new terminal and run:

```bash
# Navigate to backend directory
cd backend

# Start the server
npm start

# For development with auto-reload:
npm run dev

# Expected output:
# ✓ Server is running on http://localhost:5000
# ✓ CORS enabled for: http://localhost:3000
# ✓ MongoDB URI: mongodb://localhost:27017/mern-auth
```

---

### Start Frontend Application

Open another terminal and run:

```bash
# Navigate to frontend directory
cd frontend

# Start the React app
npm start

# Expected output:
# Compiled successfully!
# You can now view mern-auth-frontend in the browser.
# Local: http://localhost:3000
```

**The app will automatically open in your default browser at `http://localhost:3000`**

---

## 🧪 TESTING THE APPLICATION

### 1. **Test Register**
- Go to http://localhost:3000/register
- Fill in the form:
  - Name: John Doe
  - Email: john@example.com
  - Password: password123
  - Confirm Password: password123
- Click "Register"
- You should be redirected to Dashboard

### 2. **Test Login**
- Click "Logout" on Dashboard
- Go to http://localhost:3000/login
- Enter:
  - Email: john@example.com
  - Password: password123
- Click "Login"
- You should be redirected to Dashboard

### 3. **Test Protected Route**
- Try accessing http://localhost:3000/dashboard without token
- You should be redirected to login page

### 4. **Test Backend APIs** (using Postman or curl)

**Register User:**
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Login User:**
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "jane@example.com",
  "password": "password123"
}
```

**Get Current User (Protected - requires token):**
```bash
GET http://localhost:5000/api/auth/me
Authorization: Bearer <your_token_here>
```

---

## 🔑 API ENDPOINTS

### Public Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | `{name, email, password, confirmPassword}` |
| POST | `/api/auth/login` | Login user | `{email, password}` |

### Protected Endpoints (Require JWT Token)

| Method | Endpoint | Description | Header |
|--------|----------|-------------|--------|
| GET | `/api/auth/me` | Get current user | `Authorization: Bearer token` |

---

## 💡 KEY FEATURES EXPLAINED

### 1. **Password Hashing**
- Passwords are hashed using `bcryptjs` before storing in database
- Never stored in plain text
- Hashing done automatically by Mongoose middleware

### 2. **JWT Authentication**
- JWT token generated after successful login/registration
- Token stored in browser's `localStorage`
- Token sent with every API request via Authorization header
- Token expires in 7 days

### 3. **Protected Routes**
- Dashboard can only be accessed with valid token
- If no token, user redirected to login
- Protected by `ProtectedRoute` component

### 4. **Form Validation**
- Frontend: Client-side validation before sending request
- Backend: Server-side validation for security
- Prevents invalid data from reaching database

### 5. **Error Handling**
- User-friendly error messages
- Clear feedback for all operations
- Graceful error recovery

---

## 📝 ENVIRONMENT VARIABLES EXPLAINED

| Variable | Purpose | Example |
|----------|---------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/mern-auth` |
| `JWT_SECRET` | Secret key for JWT signing | `your_super_secret_key` |
| `PORT` | Server port | `5000` |
| `CORS_ORIGIN` | Allowed frontend URL | `http://localhost:3000` |

---

## 🐛 TROUBLESHOOTING

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Check if MongoDB is running
- For local: Run `mongod` in terminal
- For Atlas: Verify connection string in `.env`
- Check internet connection for Atlas

### Issue: "CORS error when connecting frontend to backend"
**Solution:**
- Check `CORS_ORIGIN` in `.env` matches frontend URL
- Default is `http://localhost:3000`
- Restart backend after changing `.env`

### Issue: "Token expired" error
**Solution:**
- Token expires in 7 days
- User needs to login again
- Frontend automatically redirects to login

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual ID)
taskkill /PID <PID> /F

# Or use different port - change PORT in .env
```

### Issue: "npm install fails"
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try installing again
npm install
```

---

## 📚 LEARNING RESOURCES

**Concepts Used:**
- **Express.js**: https://expressjs.com/
- **MongoDB/Mongoose**: https://mongoosejs.com/
- **JWT**: https://jwt.io/
- **React Router**: https://reactrouter.com/
- **Axios**: https://axios-http.com/
- **bcryptjs**: https://www.npmjs.com/package/bcryptjs

---

## ✨ NEXT STEPS (ENHANCEMENTS)

1. **Email Verification** - Send verification email on registration
2. **Password Reset** - Add forgot password functionality
3. **Profile Update** - Allow users to update their profile
4. **Search Users** - Add user search functionality
5. **Admin Panel** - Add admin user management
6. **Social Login** - Add Google/GitHub login
7. **2FA** - Two-factor authentication
8. **Database Seeding** - Seed initial data

---

## 🚨 IMPORTANT SECURITY NOTES

1. **Never commit `.env` file** with real secrets to git
2. **Use strong JWT_SECRET** in production (not `your_super_secret_jwt_key`)
3. **Enable HTTPS** in production
4. **Use MongoDB Atlas** instead of local MongoDB in production
5. **Set appropriate CORS_ORIGIN** to your actual domain
6. **Keep dependencies updated** regularly
7. **Validate all inputs** on both frontend and backend
8. **Use environment-specific configs** for dev/prod

---

## 📞 GETTING HELP

- **Backend Issues**: Check server logs in terminal
- **Frontend Issues**: Check browser console (F12)
- **API Issues**: Use Postman to test endpoints
- **Database Issues**: Check MongoDB logs

---

## ✅ PROJECT CHECKLIST

- ✓ Backend server running on port 5000
- ✓ Frontend running on port 3000
- ✓ MongoDB connected
- ✓ Can register new users
- ✓ Can login with credentials
- ✓ Can access protected dashboard
- ✓ Auto-logout redirects to login
- ✓ Form validation working
- ✓ Error messages display correctly

---

**Congratulations! You now have a fully functional MERN Stack authentication application!** 🎉

For production deployment, consider using platforms like:
- **Backend**: Heroku, Railway, Render
- **Frontend**: Vercel, Netlify
- **Database**: MongoDB Atlas

---

**Happy Coding!** 💻
