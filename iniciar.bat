@echo off
title AeroCol Airlines - Sistema Central
echo ========================================================
echo         AEROCOL AIRLINES - INICIANDO EN WINDOWS
echo ========================================================
echo.

echo [1/2] Iniciando Servidor de Datos en tiempo real (Puerto 3001)...
start "AeroCol - Servidor API" cmd /k "npm run server"

timeout /t 2 >nul

echo [2/2] Iniciando Aplicacion Web React (Frontend)...
start "AeroCol - Frontend React" cmd /k "npm run dev"

echo.
echo ========================================================
echo  Sistema iniciado con exito!
echo  Abre tu navegador en: http://localhost:5173
echo ========================================================
echo.
pause
