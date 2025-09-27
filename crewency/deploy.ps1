# Crewency Deployment Script
# This script handles the complete deployment process

Write-Host "🚀 Starting Crewency Deployment Process..." -ForegroundColor Green

# Step 1: Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the crewency directory." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Found package.json in current directory" -ForegroundColor Green

# Step 2: Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Step 3: Build the application
Write-Host "🔨 Building application..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

# Step 4: Check git status
Write-Host "📋 Checking git status..." -ForegroundColor Yellow
git status

# Step 5: Add all changes
Write-Host "📝 Adding all changes to git..." -ForegroundColor Yellow
git add .

# Step 6: Commit changes
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "Deploy: $timestamp - Production deployment"

# Step 7: Push to main branch
Write-Host "🚀 Pushing to main branch..." -ForegroundColor Yellow
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to push to main branch" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Deployment process completed!" -ForegroundColor Green
Write-Host "🌐 Your app should be available at: https://crewency-site.vercel.app" -ForegroundColor Cyan
Write-Host "⏳ Please wait 2-3 minutes for Vercel to build and deploy your changes." -ForegroundColor Yellow
