# Deployment Guide: Render + Vercel

## 📋 Table of Contents
1. [Backend Deployment (Render)](#backend-deployment-render)
2. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
3. [Environment Variables Setup](#environment-variables-setup)
4. [Post-Deployment Checklist](#post-deployment-checklist)

---

## Backend Deployment (Render)

### Prerequisites
- Render account ([render.com](https://render.com))
- GitHub repository with your backend code
- MongoDB Atlas account or MongoDB URI

### Step-by-Step Instructions

#### 1. **Push code to GitHub**
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### 2. **Create MongoDB Atlas Database**
- Go to [mongosh.com/cloud](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection string
- Format: `mongodb+srv://username:password@cluster.mongodb.net/mern-auth`

#### 3. **Create Render Service**
- Go to [render.com](https://render.com) and sign up
- Click **New +** → **Web Service**
- Connect your GitHub repository
- Fill in the following:
  - **Name**: `mern-auth-backend`
  - **Environment**: `Node`
  - **Build Command**: `npm install`
  - **Start Command**: `node server.js`
  - **Region**: Choose closest to you

#### 4. **Set Environment Variables on Render**
Click **Environment** and add:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-auth
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
CORS_ORIGIN=https://your-frontend-domain.vercel.app
NODE_ENV=production
```

#### 5. **Deploy**
- Click **Create Web Service**
- Render will automatically deploy when you push to GitHub
- Get your backend URL (e.g., `https://mern-auth-backend.onrender.com`)

---

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account ([vercel.com](https://vercel.com))
- GitHub repository with your frontend code

### Step-by-Step Instructions

#### 1. **Update Backend URL in Frontend**
Before deploying, update `frontend/src/services/api.js`:

```javascript
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});
```

Create `.env.production` in frontend:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

#### 2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click **Add New** → **Project**
- Import your GitHub repository
- Select **frontend** as root directory (if needed)
- Click **Deploy**

#### 3. **Set Environment Variables in Vercel**
- Go to Project Settings → **Environment Variables**
- Add:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

#### 4. **Update Backend CORS**
After getting your Vercel frontend URL, update Render backend environment:
```
CORS_ORIGIN=https://your-frontend-name.vercel.app
```

---

## Environment Variables Setup

### Backend (.env)
```dotenv
# MongoDB Atlas Connection String
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-auth

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Port
PORT=5000

# Frontend URL for CORS
CORS_ORIGIN=https://your-frontend-domain.vercel.app

# Environment
NODE_ENV=production
```

### Frontend (.env.production)
```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

---

## Post-Deployment Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] MongoDB Atlas cluster created
- [ ] Environment variables set correctly
- [ ] CORS enabled for frontend domain
- [ ] JWT_SECRET changed to a secure value
- [ ] Test registration: `https://your-frontend.vercel.app/register`
- [ ] Test login: `https://your-frontend.vercel.app/login`
- [ ] Test dashboard access (protected route)
- [ ] Check browser console for any errors
- [ ] Check Network tab for API calls
- [ ] Verify token is stored in localStorage

---

## Troubleshooting

### Backend won't connect to MongoDB
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0` (allow all)
- Check MONGO_URI format is correct
- Ensure database name is correct

### Frontend can't reach backend
- Check REACT_APP_API_URL environment variable
- Verify backend CORS_ORIGIN matches frontend URL
- Check browser console for CORS errors

### Login still failing
- Ensure you registered an account first
- Check email format is correct
- Verify password meets minimum requirements (6+ characters)
- Check backend logs on Render for specific error

### Token not persisting
- Clear browser localStorage
- Check if browser cookies are enabled
- Verify JWT_SECRET is set on backend

---

## Live URLs After Deployment
- **Frontend**: `https://your-frontend-name.vercel.app`
- **Backend API**: `https://your-backend-name.onrender.com/api`
- **Backend Status**: `https://your-backend-name.onrender.com/`
