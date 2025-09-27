# Deployment Diagnostic Script
# This script helps identify why the deployment is failing

Write-Host "🔍 Crewency Deployment Diagnostic" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

Write-Host ""
Write-Host "1. Checking project structure..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    Write-Host "   ✅ package.json found" -ForegroundColor Green
} else {
    Write-Host "   ❌ package.json missing" -ForegroundColor Red
}

if (Test-Path "next.config.ts") {
    Write-Host "   ✅ next.config.ts found" -ForegroundColor Green
} else {
    Write-Host "   ❌ next.config.ts missing" -ForegroundColor Red
}

if (Test-Path "src/app") {
    Write-Host "   ✅ src/app directory found" -ForegroundColor Green
} else {
    Write-Host "   ❌ src/app directory missing" -ForegroundColor Red
}

Write-Host ""
Write-Host "2. Checking build process..." -ForegroundColor Yellow
Write-Host "   Running npm run build..." -ForegroundColor Cyan
npm run build

Write-Host ""
Write-Host "3. Checking Vercel configuration..." -ForegroundColor Yellow
if (Test-Path "vercel.json") {
    Write-Host "   ✅ vercel.json found" -ForegroundColor Green
    Write-Host "   Contents:" -ForegroundColor Cyan
    Get-Content "vercel.json"
} else {
    Write-Host "   ❌ vercel.json missing" -ForegroundColor Red
}

Write-Host ""
Write-Host "4. Common Vercel Issues:" -ForegroundColor Yellow
Write-Host "   - Root Directory must be set to 'crewency' in Vercel settings" -ForegroundColor Cyan
Write-Host "   - Build Command should be 'npm run build'" -ForegroundColor Cyan
Write-Host "   - Output Directory should be '.next'" -ForegroundColor Cyan
Write-Host "   - Install Command should be 'npm install'" -ForegroundColor Cyan

Write-Host ""
Write-Host "5. Next Steps:" -ForegroundColor Yellow
Write-Host "   - Go to Vercel Dashboard > Settings > General" -ForegroundColor Cyan
Write-Host "   - Check Root Directory is set to 'crewency'" -ForegroundColor Cyan
Write-Host "   - Verify Build Settings are correct" -ForegroundColor Cyan
Write-Host "   - Try redeploying from Deployments tab" -ForegroundColor Cyan

Write-Host ""
Write-Host "🔗 Vercel Dashboard: https://vercel.com/dashboard" -ForegroundColor Green
