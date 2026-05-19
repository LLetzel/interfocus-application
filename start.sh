#!/bin/bash

# Script para iniciar o Chatbot Interfocus (Backend + Frontend)
# Para macOS e Linux

echo ""
echo "========================================"
echo "  CHATBOT INTERFOCUS - Iniciador"
echo "========================================"
echo ""

# Verifica se Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "[ERRO] Python 3 nao encontrado! Instale Python 3.8+"
    exit 1
fi

# Verifica se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "[ERRO] Node.js nao encontrado! Instale Node.js 16+"
    exit 1
fi

echo "[OK] Python e Node.js encontrados!"
echo ""

# Inicia o Backend (Python) em background
echo "[1/2] Iniciando Backend (Python)..."
cd chatbot-interfocus
pip install -q -r requirements.txt
python3 app.py &
PYTHON_PID=$!
cd ..

sleep 3

# Inicia o Frontend (React) em background
echo "[2/2] Iniciando Frontend (React)..."
cd Interfocus_vision
npm install -q
npm run dev &
NODE_PID=$!
cd ..

echo ""
echo "========================================"
echo "  Iniciadores abertos!"
echo "========================================"
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Para parar, pressione Ctrl+C"
echo ""

# Aguarda ambos os processos
wait $PYTHON_PID $NODE_PID
