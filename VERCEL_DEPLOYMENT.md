# 🚀 Deploy Frontend to Vercel - Step-by-Step

## Prerequisites
- Vercel account: [vercel.com](https://vercel.com)
- GitHub account with your repository pushed
- Backend URL from Render deployment
- Example: `https://mern-auth-backend.onrender.com`

---

## 📋 Quick Steps

### **Step 1: Sign Up on Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Choose **GitHub** to authenticate
4. Authorize Vercel to access your GitHub repositories

---

### **Step 2: Import Project**
1. After signing in, click **Add New Project** (or **New**)
2. Click **Import Git Repository**
3. Paste your GitHub repository URL:
   ```
   https://github.com/yourusername/mern-auth
   ```
4. Click **Continue**

---

### **Step 3: Configure Project**
1. **Project Name**: Keep as `mern-auth-frontend` (or change as desired)
2. **Framework Preset**: Select **Create React App**
3. **Root Directory**: Select `frontend/` (important!)
4. **Build Command**: Should auto-fill as `npm run build`
5. **Output Directory**: Should auto-fill as `build`
6. **Install Command**: Should auto-fill as `npm install`

---

### **Step 4: Set Environment Variables**
1. Scroll down to **Environment Variables**
2. Click **Add**
3. Add your environment variable:

   **Name**: `REACT_APP_API_URL`
   **Value**: `https://your-backend-name.onrender.com/api`
   
   (Replace with your actual Render backend URL)

4. Click **Add Environment Variable**
5. Confirm it's added to production

---

### **Step 5: Deploy**
1. Click **Deploy**
2. Wait for deployment to complete (usually 2-5 minutes)
3. You'll see:
   - Build output
   - Deployment success message
   - Your frontend URL: `https://your-project.vercel.app`

---

### **Step 6: Verify Deployment**
1. Open your Vercel frontend URL in browser
2. You should see your login page
3. Check browser console (F12) for any errors
4. Try registering a new account
5. Try logging in

---

## 🔄 Redeploy After Changes

### Option 1: Automatic (Recommended)
- Push changes to GitHub
- Vercel auto-redeploys on every push to main branch

### Option 2: Manual
- Go to Vercel dashboard
- Select your project
- Click **Redeploy** button

---

## ✅ Troubleshooting Vercel Deployment

### Issue: Build fails
**Solution**:
- Check build logs in Vercel dashboard
- Ensure `frontend/` is set as root directory
- Verify `package.json` exists in frontend folder

### Issue: Blank page or 404
**Solution**:
- Clear browser cache
- Check browser console (F12) for errors
- Verify API endpoint is correct in environment variables

### Issue: Can't login/register
**Solution**:
- Check REACT_APP_API_URL is set correctly
- Verify backend is running and accessible
- Check backend CORS settings
- View browser Network tab to see API calls

### Issue: CORS error
**Solution**:
- Update backend CORS_ORIGIN to your Vercel URL
- Redeploy backend on Render
- Wait a few minutes for changes to take effect

---

## 📝 Important Notes

### Before Final Deployment
- [ ] Backend is running on Render
- [ ] MongoDB is connected
- [ ] REACT_APP_API_URL is set to your Render backend
- [ ] Tested locally and works
- [ ] Code is pushed to GitHub

### After Deployment
- [ ] Test registration
- [ ] Test login
- [ ] Test token persistence
- [ ] Check browser console for errors
- [ ] View Network tab to verify API calls

---

## 🔗 Useful Vercel Links

- **Dashboard**: https://vercel.com/dashboard
- **Project Settings**: https://vercel.com/your-username/your-project/settings
- **Deployments**: https://vercel.com/your-username/your-project/deployments
- **Documentation**: https://vercel.com/docs

---

## 📊 Your URLs After Deployment

| Component | URL |
|-----------|-----|
| **Frontend** | https://your-project.vercel.app |
| **Backend API** | https://your-backend-name.onrender.com/api |
| **Status Check** | https://your-backend-name.onrender.com/ |

---

## ⚡ Performance Tips

1. **Vercel automatically**:
   - Optimizes images
   - Minifies code
   - Enables caching
   - Uses CDN globally

2. **You can**:
   - Monitor analytics in Vercel dashboard
   - Set up custom domains
   - Configure preview deployments
   - Set up automatic deployments

---

## 🔐 Security Best Practices

- ✅ Never commit `.env` files
- ✅ Use `.env.example` as template
- ✅ Set environment variables in Vercel dashboard
- ✅ Keep JWT_SECRET strong on backend
- ✅ Use HTTPS (Vercel provides SSL by default)

---

**Next Step**: Update backend CORS configuration after getting your Vercel URL
