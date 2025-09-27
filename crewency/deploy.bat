@echo off
echo 🚀 Starting Crewency Deployment...
echo.

REM Check if package.json exists
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run from crewency directory.
    pause
    exit /b 1
)

echo ✅ Found package.json
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Build application
echo 🔨 Building application...
call npm run build
if errorlevel 1 (
    echo ❌ Build failed
    pause
    exit /b 1
)

REM Git operations
echo 📝 Committing changes...
git add .
git commit -m "Deploy: %date% %time%"
git push origin main

echo.
echo ✅ DEPLOYMENT COMPLETE!
echo 🌐 URL: https://crewency-site.vercel.app
echo ⏳ Wait 2-3 minutes for Vercel to build...
echo.
pause
