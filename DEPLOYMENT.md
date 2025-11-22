# StudentMS Deployment Guide

## 🚀 Deployment Instructions

### Prerequisites
- GitHub account
- Vercel account (for frontend)
- Render account (for backend)
- MongoDB Atlas cluster (already configured)

---

## 📦 Backend Deployment (Render)

### Step 1: Prepare Backend for Deployment

1. **Create `.gitignore` in Backend folder** (if not exists):
```
node_modules/
.env
*.log
.DS_Store
```

2. **Ensure `package.json` has start script**:
```json
{
  "scripts": {
    "start": "node app.js"
  }
}
```

### Step 2: Deploy to Render

1. **Push code to GitHub**:
   - Commit all changes
   - Push to your repository

2. **Create New Web Service on Render**:
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `Backend` folder

3. **Configure Build Settings**:
   - **Name**: `studentms-backend`
   - **Root Directory**: `Backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

4. **Add Environment Variables**:
   Click "Advanced" → "Add Environment Variable" and add:
   ```
   PORT=3000
   DB_NAME=mydatabase
   MONGODB_URL=mongodb+srv://prakshilmpatel_db_user:oKTN9buLaRIw6yDv@cluster0.v6ykvmi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=60ac797c5677f3f24668d5c03b36b7205572bc03dc63f77ea475ce3d1cf1a2a24275f291312c5cf66bbc934817a64d5a5601c6cbda408b582449d0789653bd20
   JWT_EXPIRES_IN=7d
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=prakshilmpatel@gmail.com
   SMTP_PASS=zphmqxnvvnpddkrs
   FROM_EMAIL=prakshilmpatel@gmail.com
   CLOUDINARY_CLOUD_NAME=dfw7j82rh
   CLOUDINARY_API_KEY=985525723733278
   CLOUDINARY_API_SECRET=-3Odw4nuQ9-DmSDcUpYYrVT6cGk
   CORS_ORIGIN=https://your-frontend-url.vercel.app
   ```
   
   **Note**: Update `CORS_ORIGIN` after deploying frontend!

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL: `https://studentms-backend.onrender.com`

---

## 🌐 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend for Deployment

1. **Update `.env` file**:
```env
VITE_API_BASE_URL=https://studentms-backend.onrender.com/api/v1
```

2. **Create `vercel.json` in Frontend/student folder**:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Step 2: Deploy to Vercel

1. **Install Vercel CLI** (optional):
```bash
npm install -g vercel
```

2. **Deploy via Vercel Dashboard**:
   - Go to https://vercel.com
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the `Frontend/student` folder

3. **Configure Build Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `Frontend/student`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add: `VITE_API_BASE_URL` = `https://studentms-backend.onrender.com/api/v1`

5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment (2-5 minutes)
   - Copy your frontend URL: `https://studentms.vercel.app`

### Step 3: Update Backend CORS

1. Go back to Render dashboard
2. Go to your backend service → "Environment"
3. Update `CORS_ORIGIN` to your Vercel URL: `https://studentms.vercel.app`
4. Save changes (will auto-redeploy)

---

## ✅ Post-Deployment Checklist

- [ ] Backend is running on Render
- [ ] Frontend is deployed on Vercel
- [ ] CORS_ORIGIN updated in backend
- [ ] VITE_API_BASE_URL updated in frontend
- [ ] Test login/signup functionality
- [ ] Test admin dashboard
- [ ] Test student management
- [ ] Check MongoDB Atlas connections

---

## 🔧 Troubleshooting

### Backend Issues:
- **Build fails**: Check Node version (use Node 18+)
- **Database connection fails**: Verify MongoDB URL
- **CORS errors**: Ensure CORS_ORIGIN matches frontend URL exactly

### Frontend Issues:
- **API calls fail**: Check VITE_API_BASE_URL
- **404 on refresh**: Ensure vercel.json is configured
- **Build fails**: Run `npm run build` locally first

---

## 📝 Important Notes

1. **Free tier limitations**:
   - Render: Backend may sleep after 15 min of inactivity
   - Vercel: 100GB bandwidth/month

2. **Database**:
   - MongoDB Atlas is already configured
   - No changes needed

3. **Admin Account**:
   - Email: prakshilmpatel@gmail.com
   - Password: 123456

4. **Automatic Deployments**:
   - Both platforms support auto-deploy from GitHub
   - Push to main branch triggers deployment

---

## 🎉 Success!

Your Student Management System is now live!
- Frontend: https://studentms.vercel.app
- Backend: https://studentms-backend.onrender.com

