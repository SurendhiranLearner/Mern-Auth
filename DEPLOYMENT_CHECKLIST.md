# 📋 Pre-Deployment Checklist

## ✅ Local Environment Status

- [x] **MongoDB Running**: ✓ Connected locally
- [x] **Backend Server**: ✓ Running on http://localhost:5000
- [x] **Frontend Server**: ✓ Running on http://localhost:3000
- [x] **Database**: ✓ MongoDB initialized
- [x] **Project Files**: ✓ All documentation complete
- [x] **Project Backup**: ✓ Created at `Desktop/mern-auth-backup-*`

---

## 📦 Files Backed Up

```
✓ Frontend code
✓ Backend code
✓ Documentation (.md files)
✓ Configuration files (.env examples)
✓ Package dependencies (package.json files)
```

---

## 🚀 Backend Deployment to Render

### Prerequisites
- [ ] Create MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)
- [ ] Create Render account (https://render.com)
- [ ] Have backend URL ready after deployment

### MongoDB Atlas Setup
- [ ] Create new cluster (M0 free tier)
- [ ] Create database user with strong password
- [ ] Whitelist IP: 0.0.0.0/0 (allow all)
- [ ] Copy connection string
- [ ] Format: `mongodb+srv://username:password@cluster.xxxxx.mongodb.net/mern-auth`

### Render Backend Deployment
- [ ] Go to https://render.com
- [ ] Click "New +" → "Web Service"
- [ ] Paste repository URL (or upload files)
- [ ] Set service name: `mern-auth-backend`
- [ ] Choose Node environment
- [ ] Build command: `npm install`
- [ ] Start command: `node server.js`
- [ ] Set environment variables:
  ```
  MONGO_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/mern-auth
  JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
  PORT=5000
  CORS_ORIGIN=http://localhost:3000 (update after frontend deploys)
  NODE_ENV=production
  ```
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (3-5 minutes)
- [ ] Save backend URL: `https://your-backend-name.onrender.com`

### Verify Backend
- [ ] Test: https://your-backend-name.onrender.com/
- [ ] Should return: `{"message":"MERN Auth API is running"}`
- [ ] Check logs for any errors

---

## 🎨 Frontend Deployment to Vercel

### Vercel Frontend Setup
- [ ] Go to https://vercel.com
- [ ] Click "Add New" → "Project"
- [ ] Import your GitHub repository (or upload)
- [ ] Select root directory: `frontend/`
- [ ] Build command: `npm run build`
- [ ] Output directory: `build`
- [ ] Environment variables:
  ```
  REACT_APP_API_URL=https://your-backend-name.onrender.com/api
  ```
- [ ] Click "Deploy"
- [ ] Save frontend URL: `https://your-frontend-name.vercel.app`

### Verify Frontend
- [ ] Test: https://your-frontend-name.vercel.app
- [ ] Try registration
- [ ] Try login
- [ ] Check browser console for errors

---

## 🔄 Post-Deployment Updates

### Update Backend CORS
- [ ] Go back to Render dashboard
- [ ] Update `CORS_ORIGIN` environment variable
- [ ] Set to: `https://your-frontend-name.vercel.app`
- [ ] Redeploy backend (auto-redeploy on env change)

### Test Full Flow
- [ ] Open frontend URL in browser
- [ ] Register new account
- [ ] Login with credentials
- [ ] Access dashboard
- [ ] Check localStorage for token

---

## 🔐 Production Credentials

**Save these securely** (e.g., in a password manager):

```
MongoDB Atlas:
- Email: your-email@example.com
- Password: ••••••••••••••••••

JWT_SECRET: 
- your_super_secret_jwt_key_change_this_in_production

Backend URL:
- https://your-backend-name.onrender.com

Frontend URL:
- https://your-frontend-name.vercel.app

MongoDB Connection String:
- mongodb+srv://username:password@cluster.xxxxx.mongodb.net/mern-auth
```

---

## 📱 Local Development vs Production

### Local Development
```
Frontend: http://localhost:3000
Backend: http://localhost:5000
Database: mongodb://localhost:27017/mern-auth
```

### Production
```
Frontend: https://your-frontend-name.vercel.app
Backend: https://your-backend-name.onrender.com
Database: MongoDB Atlas (cloud)
```

---

## ❌ Common Issues & Solutions

### Backend won't connect to MongoDB
- [ ] Check MongoDB Atlas IP whitelist
- [ ] Verify connection string format
- [ ] Check username/password

### Frontend can't reach backend
- [ ] Check REACT_APP_API_URL is set
- [ ] Verify CORS_ORIGIN in backend matches frontend URL
- [ ] Check browser console for CORS errors

### Login fails
- [ ] Ensure user is registered first
- [ ] Check email format
- [ ] Verify password is 6+ characters
- [ ] Check backend logs

### Token not persisting
- [ ] Clear browser localStorage
- [ ] Check if cookies are enabled
- [ ] Verify JWT_SECRET on backend

---

## 📞 Support

- **Documentation**: See README.md, DEPLOYMENT_GUIDE.md
- **JWT Explanation**: See JWT_APIS_EXPLANATION.md
- **Project Details**: See PROJECT_DESCRIPTION.md

---

## 🎯 Next Steps After Deployment

1. **Monitor Performance**
   - Check Render logs
   - Monitor Vercel analytics
   - Check MongoDB usage

2. **Security Updates**
   - Rotate JWT_SECRET periodically
   - Update MongoDB credentials
   - Monitor for suspicious activity

3. **Scale Application**
   - Add more protected routes
   - Implement refresh tokens
   - Add rate limiting
   - Add email verification

4. **Maintenance**
   - Regular backups
   - Update dependencies
   - Monitor logs
   - Performance optimization

---

**Created**: December 27, 2025
**Status**: ✅ Ready for Deployment
**Version**: 1.0.0
