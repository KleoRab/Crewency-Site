# Vercel Environment Variables Setup Script
# This script helps you set up the correct environment variables in Vercel

Write-Host "🔧 Vercel Environment Variables Setup" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

Write-Host ""
Write-Host "📋 Required Environment Variables:" -ForegroundColor Yellow
Write-Host ""

Write-Host "1. NEXT_PUBLIC_SUPABASE_URL" -ForegroundColor Cyan
Write-Host "   Value: https://cflvgaikzylkhvneqjyv.supabase.co" -ForegroundColor White
Write-Host "   Environment: Production, Preview, Development" -ForegroundColor Gray

Write-Host ""
Write-Host "2. NEXT_PUBLIC_SUPABASE_ANON_KEY" -ForegroundColor Cyan
Write-Host "   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmbHZnYWlrenlsa2h2bmVxanl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NzgwNjksImV4cCI6MjA3NDU1NDA2OX0.eCLPVxB2AhOy49u_WcvXIzs_h4DpAdo7FHw5bmjCLsM" -ForegroundColor White
Write-Host "   Environment: Production, Preview, Development" -ForegroundColor Gray

Write-Host ""
Write-Host "3. NEXTAUTH_SECRET" -ForegroundColor Cyan
Write-Host "   Value: crewency-super-secret-key-2024-production" -ForegroundColor White
Write-Host "   Environment: Production, Preview, Development" -ForegroundColor Gray

Write-Host ""
Write-Host "4. NEXTAUTH_URL" -ForegroundColor Cyan
Write-Host "   Value: https://crewency-site.vercel.app" -ForegroundColor White
Write-Host "   Environment: Production, Preview, Development" -ForegroundColor Gray

Write-Host ""
Write-Host "🔗 Vercel Dashboard Links:" -ForegroundColor Yellow
Write-Host "1. Go to: https://vercel.com/dashboard" -ForegroundColor Cyan
Write-Host "2. Click on your 'crewency-site' project" -ForegroundColor Cyan
Write-Host "3. Go to Settings > Environment Variables" -ForegroundColor Cyan
Write-Host "4. Add each variable above (click 'Add New')" -ForegroundColor Cyan
Write-Host "5. Make sure to select all environments for each variable" -ForegroundColor Cyan

Write-Host ""
Write-Host "⚠️  Important Notes:" -ForegroundColor Red
Write-Host "- Delete any existing STORAGE_ variables if they cause conflicts" -ForegroundColor Yellow
Write-Host "- Make sure to select 'Production', 'Preview', and 'Development' for each variable" -ForegroundColor Yellow
Write-Host "- After adding variables, go to Deployments and trigger a new deployment" -ForegroundColor Yellow

Write-Host ""
Write-Host "✅ After setting up variables, run: .\deploy.ps1" -ForegroundColor Green