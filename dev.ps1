# run-dev.ps1
# Script para levantar el entorno de desarrollo completo de Voltia SaaS (Windows)

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " Levantando Entorno de Desarrollo Voltia " -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan

# 1. Levantar Docker (Base de Datos MySQL y Nginx Proxy Manager si aplica)
Write-Host "[1/3] Iniciando infraestructura Docker (Base de datos)..." -ForegroundColor Yellow
docker-compose up -d

# Esperar unos segundos para asegurar que la BDD inicialice bien
Start-Sleep -Seconds 5

# 2. Levantar el Backend (NestJS) en una nueva ventana
Write-Host "[2/3] Levantando Backend (NestJS) en el puerto 3011..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd api; npm run start:dev" -WindowStyle Normal

# 3. Levantar el Frontend (React/Vite) en una nueva ventana
Write-Host "[3/3] Levantando Frontend (Vite) en el puerto 3008..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev" -WindowStyle Normal

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " ¡Todo Listo! El sistema está operando." -ForegroundColor Green
Write-Host " Backend corriendo en http://localhost:3011" -ForegroundColor Gray
Write-Host " Frontend corriendo en http://localhost:3000" -ForegroundColor Gray
Write-Host "=========================================" -ForegroundColor Cyan
