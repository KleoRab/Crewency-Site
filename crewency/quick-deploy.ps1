# Quick Deploy Script - One Command Deployment
# This script does everything in one go

Write-Host "⚡ Quick Deploy - Crewency Platform" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Please run this from the crewency directory" -ForegroundColor Red
    exit 1
}

# Stop any running processes
Write-Host "🛑 Stopping any running processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install --silent

# Build the application
Write-Host "🔨 Building application..." -ForegroundColor Yellow
npm run build

# Git operations
Write-Host "📝 Committing changes..." -ForegroundColor Yellow
git add .
$timestamp = Get-Date -Format "yyyy-MM-dd-HHmm"
git commit -m "Deploy: $timestamp" --quiet

# Push to main
Write-Host "🚀 Pushing to main branch..." -ForegroundColor Yellow
git push origin main --quiet

Write-Host ""
Write-Host "✅ DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "🌐 URL: https://crewency-site.vercel.app" -ForegroundColor Cyan
Write-Host "⏳ Wait 2-3 minutes for Vercel to build..." -ForegroundColor Yellow
Write-Host ""
Write-Host "🔧 If deployment fails, check environment variables:" -ForegroundColor Yellow
Write-Host "   Run: .\setup-vercel.ps1" -ForegroundColor Cyan
