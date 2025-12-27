# MERN AUTH APP - CODE EXPLANATION

## 📚 Understanding the Code

This guide explains each file and how they work together.

---

## 🔙 BACKEND CODE

### 1. **server.js** - Main Server File
**What it does:** Starts the Express server and sets up middleware

**Key Points:**
- Loads environment variables from `.env`
- Connects to MongoDB
- Sets up CORS and JSON parsing
- Defines API routes
- Listens on port 5000

**Important Middleware:**
```javascript
app.use(cors())           // Allow frontend requests
app.use(express.json())   // Parse JSON data
```

---

### 2. **config/db.js** - Database Connection
**What it does:** Connects to MongoDB using Mongoose

**How it works:**
1. Takes `MONGO_URI` from environment variables
2. Connects to MongoDB
3. Returns success or error message
4. Called from `server.js`

**Connection Options:**
```javascript
useNewUrlParser: true        // Use new MongoDB connection string parser
useUnifiedTopology: true     // Use new connection pool engine
```

---

### 3. **models/User.js** - User Schema
**What it does:** Defines how user data is stored in MongoDB

**User Schema Fields:**
```javascript
{
  name: String,           // User's full name
  email: String,          // Unique email address
  password: String,       // Hashed password (never plain text)
  createdAt: Date         // When user registered
}
```

**Key Features:**
- **Password Hashing:** Done automatically before saving
- **matchPassword() method:** Compares entered password with hashed password
- **Validation:** Email format, password length, name length

**Password Hashing Process:**
```javascript
1. User enters password → "password123"
2. Schema.pre('save') middleware runs
3. Generates salt with 10 rounds
4. Hashes password + salt → "$2a$10$xyz..."
5. Stores hashed password in database
```

---

### 4. **controllers/authController.js** - Business Logic
**What it does:** Contains functions that handle registration, login, and user retrieval

#### **register() Function:**
1. Validates all required fields
2. Checks if email already exists
3. Creates new user
4. Hashes password automatically
5. Generates JWT token
6. Returns token to frontend

#### **login() Function:**
1. Validates email and password provided
2. Finds user by email
3. Compares entered password with hashed password
4. If matches, generates JWT token
5. Returns token to frontend
6. If not matches, returns error

#### **getCurrentUser() Function:**
1. Uses user ID from JWT token
2. Fetches user from database
3. Returns user information

**Token Generation:**
```javascript
jwt.sign(
  { userId },              // Data to encode
  process.env.JWT_SECRET,  // Secret key
  { expiresIn: '7d' }      // Expires in 7 days
)
```

---

### 5. **middleware/authMiddleware.js** - JWT Verification
**What it does:** Protects routes by verifying JWT tokens

**How it works:**
1. Gets token from Authorization header: `"Bearer token_here"`
2. Verifies token with JWT_SECRET
3. If valid, allows request to continue
4. If invalid or expired, returns 401 error
5. Attaches user ID to request object

**Example:**
```javascript
// Frontend sends:
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Middleware verifies and extracts userId
// Controller receives request with req.userId attached
```

---

### 6. **routes/authRoutes.js** - API Endpoints
**What it does:** Defines all authentication API endpoints

**Routes:**
```javascript
POST   /api/auth/register    → Public (register function)
POST   /api/auth/login       → Public (login function)
GET    /api/auth/me          → Protected (getCurrentUser function)
```

---

## 🎨 FRONTEND CODE

### 1. **App.js** - Main App Component
**What it does:** Sets up routing for the entire application

**Routes:**
```javascript
/register    → Register page (public)
/login       → Login page (public)
/dashboard   → Dashboard page (protected)
/            → Redirects to login
/*           → Unknown routes redirect to login
```

**Protected Route:**
```javascript
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

---

### 2. **components/ProtectedRoute.js** - Route Protection
**What it does:** Prevents unauthorized access to protected pages

**Logic:**
```javascript
1. Check if authToken exists in localStorage
2. If no token → Redirect to /login
3. If token exists → Render protected component
```

---

### 3. **pages/Register.js** - Registration Form
**What it does:** User registration page with form

**Form Fields:**
- Name
- Email
- Password
- Confirm Password

**Validation:**
- Name not empty
- Valid email format
- Password ≥ 6 characters
- Passwords match

**Submission Process:**
```javascript
1. Validate form inputs
2. Call registerUser() from API service
3. If success:
   - Save token to localStorage
   - Show success message
   - Redirect to dashboard
4. If error:
   - Show error message
   - User can retry
```

---

### 4. **pages/Login.js** - Login Form
**What it does:** User login page with form

**Form Fields:**
- Email
- Password

**Validation:**
- Valid email format
- Password provided

**Submission Process:**
```javascript
1. Validate form inputs
2. Call loginUser() from API service
3. If success:
   - Save token to localStorage
   - Show success message
   - Redirect to dashboard
4. If error:
   - Show error message
   - User can retry
```

---

### 5. **pages/Dashboard.js** - Protected Page
**What it does:** User dashboard (only visible to logged-in users)

**On Load:**
```javascript
1. Fetch user data using getCurrentUser()
2. Display user information
3. If error → Redirect to login
```

**Features:**
- Display user name, email, ID
- Logout button
- Shows success message

**Logout:**
```javascript
1. Remove token from localStorage
2. Remove userName from localStorage
3. Redirect to login page
```

---

### 6. **services/api.js** - API Service
**What it does:** Centralizes all API calls using axios

**API Instance:**
```javascript
const API = axios.create({
  baseURL: 'http://localhost:5000/api'
})
```

**Request Interceptor:**
```javascript
1. Gets token from localStorage
2. Adds to Authorization header: "Bearer token"
3. Sends request to backend
```

**API Functions:**
```javascript
registerUser(userData)   → POST /auth/register
loginUser(credentials)   → POST /auth/login
getCurrentUser()         → GET /auth/me
```

---

## 🔐 AUTHENTICATION FLOW

### Registration Flow:
```
User fills form
        ↓
Frontend validates
        ↓
POST /api/auth/register {name, email, password}
        ↓
Backend validates
        ↓
Check if email exists
        ↓
Hash password
        ↓
Save to database
        ↓
Generate JWT token
        ↓
Return token to frontend
        ↓
Frontend saves token to localStorage
        ↓
Redirect to dashboard
```

### Login Flow:
```
User enters credentials
        ↓
Frontend validates
        ↓
POST /api/auth/login {email, password}
        ↓
Backend finds user by email
        ↓
Compare password with hash
        ↓
If match: Generate JWT token
        ↓
Return token to frontend
        ↓
Frontend saves token to localStorage
        ↓
Redirect to dashboard
```

### Protected Route Access:
```
User tries to access /dashboard
        ↓
ProtectedRoute component checks localStorage
        ↓
If token exists → Show dashboard
        ↓
If no token → Redirect to login
```

### API Request with Auth:
```
Frontend makes API call with token
        ↓
Interceptor adds: Authorization: Bearer token
        ↓
Backend receives request
        ↓
authMiddleware verifies token
        ↓
If valid → Extract userId, continue
        ↓
If invalid → Return 401 error
```

---

## 🔑 KEY CONCEPTS

### 1. **Password Hashing**
- User password: `password123`
- Hashed password: `$2a$10$abcdef...`
- Never store plain password
- Only store hash
- Can't reverse hash back to password

### 2. **JWT Token**
- Contains: `header.payload.signature`
- Payload contains: `{userId, expiresIn}`
- Signed with JWT_SECRET
- Used to verify user identity
- Expires after 7 days

### 3. **LocalStorage**
- Browser storage for data
- Persists even after page refresh
- Accessible to JavaScript
- Stores: authToken, userName
- Cleared on logout

### 4. **Middleware**
- Functions that run before route handlers
- Check authentication
- Parse data
- Add data to request object

### 5. **Validation**
- **Frontend:** Quick feedback to user
- **Backend:** Prevents invalid data in database
- Both needed for security

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│              USER REGISTRATION                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Frontend (React)          Backend (Express)        │
│  ─────────────────         ──────────────────       │
│                                                     │
│  1. User fills form        5. Validate data         │
│        ↓                        ↓                   │
│  2. Frontend validates     6. Check email exists    │
│        ↓                        ↓                   │
│  3. POST /register         7. Hash password         │
│  {name,email,pass}              ↓                   │
│        ─────────────────→   8. Save to DB           │
│                                 ↓                   │
│                            9. Generate token        │
│                                 ↓                   │
│                            10. Return token         │
│  11. Save token            ←──────────────          │
│  to localStorage                                    │
│        ↓                                            │
│  12. Redirect to dashboard                          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🛠️ How to Modify Code

### Add a New Field to User
1. Edit `backend/models/User.js`
2. Add field to schema: `phoneNumber: String`
3. Edit `backend/controllers/authController.js`
4. Include field in register/login response
5. Edit frontend form to accept new field

### Change Token Expiration
1. Edit `backend/controllers/authController.js`
2. Change: `{ expiresIn: '7d' }` to desired time
3. Examples: `'1h'`, `'30d'`, `'1y'`

### Customize Styling
1. Edit `frontend/src/pages/Auth.css`
2. Edit `frontend/src/pages/Dashboard.css`
3. Modify colors, fonts, spacing
4. Changes apply immediately

### Add Email Validation
1. Edit `backend/routes/authRoutes.js`
2. Add email verification middleware
3. Send verification email
4. Check verified status before login

---

## 📝 Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot find module 'express'` | Package not installed | Run `npm install` |
| `MongooseError: cannot connect` | MongoDB not running | Start MongoDB |
| `SyntaxError: Unexpected token` | Invalid JSON | Check JSON syntax |
| `401 Unauthorized` | Invalid/expired token | Login again |
| `CORS error` | Wrong CORS origin | Check `.env` CORS_ORIGIN |
| `Invalid token signature` | Wrong JWT_SECRET | Check JWT_SECRET in `.env` |

---

## 🎓 Learning Outcomes

After completing this project, you'll understand:
- ✅ How to build a MERN stack app
- ✅ Password hashing and security
- ✅ JWT token-based authentication
- ✅ Protected routes
- ✅ API design and REST principles
- ✅ Frontend-backend communication
- ✅ MongoDB data modeling
- ✅ Form validation
- ✅ Error handling
- ✅ Middleware concept

---

**Keep this document as reference while learning!** 📖
