# JWT Protected APIs - Complete Explanation

## 🔑 What is JWT?

**JWT (JSON Web Token)** is a stateless authentication mechanism that securely transmits information between client and server.

### JWT Structure
A JWT has three parts separated by dots:
```
header.payload.signature
```

**Example JWT**:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJpYXQiOjE2OTI1NjM0NTYsImV4cCI6MTY5MzE2ODI1Nn0.x3jK8mP9lQ2vN5rS8wZ1aB4cD7eF9gH0jK3mP5qR8s
```

### JWT Parts Explained

#### 1. Header
```json
{
  "alg": "HS256",    // Algorithm (HMAC SHA-256)
  "typ": "JWT"       // Token type
}
```

#### 2. Payload (Claims)
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "iat": 1692563456,           // Issued at
  "exp": 1693168256            // Expires in 7 days
}
```

#### 3. Signature
```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  "your_super_secret_jwt_key_change_this_in_production"
)
```

---

## 📋 How JWT Authentication Works in This App

### Step 1: User Registration
```javascript
// Backend: authController.js
const generateToken = (userId) => {
  return jwt.sign(
    { userId },                    // Payload
    process.env.JWT_SECRET,        // Secret key
    { expiresIn: '7d' }            // Options: expires in 7 days
  );
};

// User registers → JWT token generated
const token = generateToken(user._id);
```

### Step 2: Token Storage (Frontend)
```javascript
// Frontend: Login.js
if (response.data.token) {
  localStorage.setItem('authToken', response.data.token);
  localStorage.setItem('userName', response.data.user.name);
}
```

### Step 3: Token in Every Request
```javascript
// Frontend: services/api.js
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  
  if (token) {
    // Add token to Authorization header
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});
```

**Request Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

### Step 4: Token Verification (Backend)
```javascript
// Backend: middleware/authMiddleware.js
const authMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }
    
    // Verify token signature and expiration
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user ID to request
    req.userId = decoded.userId;
    
    next(); // Continue to route handler
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};
```

### Step 5: Protected Route
```javascript
// Backend: routes/authRoutes.js
// GET /api/auth/me (requires authentication)
router.get('/me', authMiddleware, authController.getCurrentUser);

// authMiddleware checks token first
// If valid, getCurrentUser handler executes
// If invalid, 401 response sent
```

---

## 🔐 API Endpoint Protection

### Public Routes (No Token Required)
```
POST /api/auth/register  - Any user can register
POST /api/auth/login     - Any user can login
```

### Protected Routes (Token Required)
```
GET /api/auth/me         - Only authenticated users
```

---

## 📤 Request/Response Flow

### Login Request
```
Client Request:
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Server Response (200 OK):
{
  "success": true,
  "message": "Login successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

### Protected API Request
```
Client Request:
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

Server Steps:
1. Extract token from Authorization header
2. Verify token signature using JWT_SECRET
3. Check if token is expired
4. Extract userId from token payload
5. Attach userId to request object

Server Response (200 OK):
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

### Failed Authentication
```
Client Request (without token):
GET /api/auth/me
Content-Type: application/json

Server Response (401 Unauthorized):
{
  "success": false,
  "message": "No token provided"
}

---

Client Request (with expired token):
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (expired)

Server Response (401 Unauthorized):
{
  "success": false,
  "message": "Invalid or expired token"
}
```

---

## 🛡️ Security Features

### 1. Stateless Authentication
- Server doesn't store session data
- Token contains all needed information
- Reduces server memory usage
- Scales well across multiple servers

### 2. Token Expiration
```javascript
// Token expires in 7 days
{ expiresIn: '7d' }

// After expiration, user must login again
// New token generated
```

### 3. Signature Verification
```javascript
// Only valid if:
// 1. Signature matches JWT_SECRET
// 2. Token hasn't been modified
// 3. Token hasn't expired
jwt.verify(token, process.env.JWT_SECRET);
```

### 4. Secure Storage
```javascript
// Token stored in browser localStorage
// Included in every request automatically
// Cleared when user logs out
```

---

## 🔄 Complete Authentication Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│ 1. USER REGISTRATION/LOGIN                                  │
│    - Submit email & password                                │
│    - Server validates credentials                           │
│    - Server generates JWT token                             │
│    - Token returned to client                               │
└──────────────────────┬──────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. TOKEN STORAGE                                            │
│    - Token saved in localStorage                            │
│    - Token persists across page refreshes                   │
│    - Token removed on logout                                │
└──────────────────────┬──────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. AUTHENTICATED REQUESTS                                   │
│    - Include token in every API request                     │
│    - Header: Authorization: Bearer <token>                  │
│    - Axios interceptor handles automatically                │
└──────────────────────┬──────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. SERVER VERIFICATION                                      │
│    - Extract token from Authorization header                │
│    - Verify signature (hasn't been tampered)                │
│    - Check expiration time                                  │
│    - If valid: continue to route handler                    │
│    - If invalid: return 401 Unauthorized                    │
└──────────────────────┬──────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. ROUTE HANDLER EXECUTION                                  │
│    - Access user ID from req.userId                         │
│    - Query database for user info                           │
│    - Return protected resource                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 💻 Code Examples

### Creating a Protected Route Handler

```javascript
// Backend: controllers/authController.js
const getCurrentUser = async (req, res) => {
  try {
    // req.userId set by authMiddleware
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
};
```

### Protecting Routes in Frontend

```javascript
// Frontend: components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // No token = not authenticated
    return <Navigate to="/login" replace />;
  }

  // Token exists = show component
  return children;
};

export default ProtectedRoute;
```

### Using Protected Route

```javascript
// Frontend: App.js
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
</Routes>
```

---

## ⚠️ Common Issues & Solutions

### Issue: Token Not Included in Requests
**Cause**: localStorage doesn't have token
**Solution**: Login first, verify token saved

### Issue: Token Expired
**Cause**: Token older than 7 days
**Solution**: Login again to get new token

### Issue: "Invalid Signature" Error
**Cause**: JWT_SECRET changed or token tampered
**Solution**: Use consistent JWT_SECRET

### Issue: CORS Error with Token
**Cause**: Frontend URL not in CORS_ORIGIN
**Solution**: Update backend .env CORS_ORIGIN

---

## 🚀 Best Practices

1. **Keep JWT_SECRET Strong**: Minimum 32 random characters
2. **Use HTTPS in Production**: Tokens transmitted securely
3. **Set Appropriate Expiration**: 7 days for this app
4. **Don't Store Sensitive Data**: Only store user ID in token
5. **Validate on Both Sides**: Client and server validation
6. **Clear Token on Logout**: Remove from localStorage
7. **Handle Token Refresh**: Implement refresh tokens for long sessions
8. **Secure Headers**: Set secure cookies, HTTPS only

---

## 📚 Additional Resources

- [JWT.io](https://jwt.io) - JWT documentation and debugger
- [RFC 7519](https://tools.ietf.org/html/rfc7519) - JWT specification
- [Node.js jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [Axios Interceptors](https://axios-http.com/docs/interceptors)
