# 🚀 Crewency Deployment Scripts

This directory contains automated scripts to deploy your Crewency platform to Vercel.

## 📋 Prerequisites

1. **Git configured** with your GitHub repository
2. **Vercel project** connected to your GitHub repo
3. **Environment variables** set in Vercel (see setup-vercel.ps1)

## 🛠️ Available Scripts

### 1. Quick Deploy (Recommended)
```powershell
.\quick-deploy.ps1
```
**What it does:**
- Installs dependencies
- Builds the application
- Commits and pushes to main branch
- Triggers Vercel deployment

### 2. Full Deploy
```powershell
.\deploy.ps1
```
**What it does:**
- Same as quick deploy but with more detailed output
- Better for debugging issues

### 3. Windows Batch File
```cmd
deploy.bat
```
**What it does:**
- Same as PowerShell scripts but for Windows Command Prompt
- No PowerShell required

### 4. Environment Variables Setup
```powershell
.\setup-vercel.ps1
```
**What it does:**
- Shows you exactly what environment variables to set in Vercel
- Provides direct links to Vercel dashboard

## 🔧 Environment Variables Required

Before deploying, make sure these are set in Vercel:

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://cflvgaikzylkhvneqjyv.supabase.co` | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | All |
| `NEXTAUTH_SECRET` | `crewency-super-secret-key-2024-production` | All |
| `NEXTAUTH_URL` | `https://crewency-site.vercel.app` | All |

## 🚀 How to Deploy

### Option 1: One Command (Easiest)
```powershell
.\quick-deploy.ps1
```

### Option 2: Manual Steps
1. Set up environment variables: `.\setup-vercel.ps1`
2. Deploy: `.\deploy.ps1`

### Option 3: Windows CMD
```cmd
deploy.bat
```

## 🔍 Troubleshooting

### Build Fails
- Check if all dependencies are installed: `npm install`
- Verify TypeScript compilation: `npm run build`

### Environment Variables Missing
- Run `.\setup-vercel.ps1` to see what variables you need
- Go to Vercel dashboard and add them

### Git Push Fails
- Check if you're on the right branch: `git branch`
- Make sure you have write access to the repository

### Vercel Deployment Fails
- Check Vercel dashboard for error logs
- Verify environment variables are set correctly
- Make sure the root directory is set to `crewency` in Vercel settings

## 📱 After Deployment

1. **Wait 2-3 minutes** for Vercel to build
2. **Visit**: https://crewency-site.vercel.app
3. **Test** the application functionality
4. **Check** Vercel dashboard for any errors

## 🎯 Success Indicators

✅ Build completes without errors  
✅ Git push succeeds  
✅ Vercel deployment shows "Ready"  
✅ Website loads at the URL  
✅ No console errors in browser  

## 🆘 Need Help?

If you encounter issues:
1. Check the error messages in the terminal
2. Look at Vercel dashboard for deployment logs
3. Verify all environment variables are set
4. Make sure you're in the `crewency` directory when running scripts

---

**Happy Deploying! 🚀**
