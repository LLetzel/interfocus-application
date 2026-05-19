@echo off
REM Script para iniciar o Chatbot Interfocus (Backend + Frontend)
REM Execute este arquivo para iniciar o projeto completo

echo.
echo ========================================
echo   CHATBOT INTERFOCUS - Iniciador
echo ========================================
echo.

REM Verifica se Python está instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Python nao encontrado! Instale Python 3.8+
    pause
    exit /b 1
)

REM Verifica se Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado! Instale Node.js 16+
    pause
    exit /b 1
)

echo [OK] Python e Node.js encontrados!
echo.

REM Inicia o Backend (Python)
echo [1/2] Iniciando Backend (Python)...
cd chatbot-interfocus
pip install -r requirements.txt >nul 2>&1
start cmd /k "python app.py"
cd ..

timeout /t 3 /nobreak

REM Inicia o Frontend (React)
echo [2/2] Iniciando Frontend (React)...
cd Interfocus_vision
npm install >nul 2>&1
start cmd /k "npm run dev"
cd ..

echo.
echo ========================================
echo   Iniciadores abertos!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Pressione qualquer tecla para fechar...
pause >nul
