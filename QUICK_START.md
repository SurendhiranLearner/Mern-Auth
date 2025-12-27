# MERN AUTH APP - QUICK START GUIDE

## 🚀 Quick Installation (5 minutes)

### Prerequisites
- Node.js installed ([Download](https://nodejs.org/))
- MongoDB running or MongoDB Atlas account

### Commands to Run

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm start
```
Server runs on: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```
App runs on: `http://localhost:3000`

---

## 📝 Test Credentials

After registering, you can login with:
- **Email:** your_email@example.com
- **Password:** your_password

---

## 🔗 Important URLs

| Purpose | URL |
|---------|-----|
| Register | `http://localhost:3000/register` |
| Login | `http://localhost:3000/login` |
| Dashboard | `http://localhost:3000/dashboard` |
| Backend API | `http://localhost:5000/api` |

---

## ⚙️ Environment Variables

**Backend `.env` file:**
- `MONGO_URI` - Database connection string
- `JWT_SECRET` - Secret for tokens
- `PORT` - Server port (default: 5000)
- `CORS_ORIGIN` - Frontend URL (default: http://localhost:3000)

---

## 🔄 Workflow

1. User registers → Password hashed → Token generated → Stored in localStorage
2. User logs in → Credentials verified → Token generated → Redirected to dashboard
3. User accesses protected route → Token verified → Access granted
4. User logs out → Token removed → Redirected to login

---

## 🛑 Stop Running Apps

- **Backend:** Press `Ctrl + C` in terminal
- **Frontend:** Press `Ctrl + C` in terminal
- **MongoDB:** Press `Ctrl + C` if running locally

---

## 📱 API Response Format

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 💾 File Structure Summary

```
Backend Files:
- server.js → Main app
- config/db.js → MongoDB setup
- models/User.js → User data
- controllers/authController.js → Logic
- routes/authRoutes.js → Endpoints
- middleware/authMiddleware.js → JWT check
- .env → Configuration

Frontend Files:
- App.js → Main component
- pages/Register.js → Register form
- pages/Login.js → Login form
- pages/Dashboard.js → Protected page
- services/api.js → API calls
- components/ProtectedRoute.js → Route protection
```

---

## ✨ Features

✅ User Registration with password hashing  
✅ Secure Login with JWT tokens  
✅ Protected Dashboard page  
✅ Token stored in localStorage  
✅ Auto-redirect on logout  
✅ Form validation (frontend & backend)  
✅ Error/success messages  
✅ Beginner-friendly code with comments  

---

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| Can't connect to MongoDB | Start MongoDB or check Atlas connection string |
| CORS error | Verify `CORS_ORIGIN` in `.env` is `http://localhost:3000` |
| Port already in use | Change `PORT` in `.env` or kill existing process |
| npm install fails | Run `npm cache clean --force` then try again |
| Token errors | Clear localStorage and login again |

---

## 📖 Next Steps

1. Explore the code in each file
2. Modify styling in `.css` files
3. Add new fields to User model
4. Implement password reset
5. Add email verification

---

**Need detailed setup? See: `SETUP_AND_RUNNING_GUIDE.md`**
