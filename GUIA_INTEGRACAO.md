# 🚀 Guia de Integração - Chatbot Interfocus

## Visão Geral
Este documento descreve como executar o projeto integrado do **Chatbot Python (Backend)** com a **Aplicação React (Frontend)**.

---

## 📋 Pré-requisitos

- **Python 3.8+** instalado
- **Node.js 16+** instalado
- **npm** ou **yarn** instalado

---

## 🔧 Instalação

### 1️⃣ **Setup do Backend (Python)**

```bash
# Navegue até a pasta do chatbot
cd chatbot-interfocus

# Crie um ambiente virtual (opcional, mas recomendado)
python -m venv venv

# Ative o ambiente virtual
# No Windows:
venv\Scripts\activate
# No macOS/Linux:
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt
```

### 2️⃣ **Setup do Frontend (React)**

```bash
# Navegue até a pasta do frontend
cd Interfocus_vision

# Instale as dependências
npm install
```

---

## ▶️ Executando o Projeto

### **Terminal 1: Backend (Python)**

```bash
cd chatbot-interfocus

# Ative o ambiente virtual (se criou)
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

# Execute o servidor Flask
python app.py
```

**Esperado:** A saída será:
```
=== CHATBOT INTERFOCUS API ===
🚀 Servidor rodando em http://localhost:5000
📡 Endpoint: POST /chat
✅ CORS habilitado para React
```

---

### **Terminal 2: Frontend (React)**

```bash
cd Interfocus_vision

# Execute o servidor de desenvolvimento
npm run dev
```

**Esperado:** A saída será:
```
  VITE v8.0.12  ready in 123 ms

  ➜  Local:   http://localhost:5173/
```

---

## ✅ Testando a Integração

1. Abra o navegador e acesse: **http://localhost:5173/**
2. Digite uma mensagem no chatbot
3. A mensagem será enviada para a API Python
4. O chatbot responderá com base na knowledge base

**Exemplos de mensagens:**
- "minha internet caiu"
- "wifi não conecta"
- "internet lenta"
- "segunda via boleto"
- "sem sinal"

---

## 📡 Arquitetura da Integração

```
┌─────────────────┐
│  React Frontend │
│  (Vite - 5173)  │
└────────┬────────┘
         │
         │ POST /chat
         │ (JSON)
         ↓
┌─────────────────┐
│  Flask Backend  │
│  (Python - 5000)│
└─────────────────┘
         │
         ↓
  Knowledge Base
  + TF-IDF
  + Similaridade
```

---

## 🛠️ Estrutura de Arquivos

```
INTERFOCUS/
├── chatbot-interfocus/          # Backend (Python)
│   ├── app.py                   # API Flask com endpoints
│   ├── knowledge_base.py        # Base de conhecimento
│   ├── requirements.txt         # Dependências Python
│   └── .env.example             # Configurações (exemplo)
│
└── Interfocus_vision/           # Frontend (React)
    ├── src/
    │   ├── App.jsx              # Componente principal (integrado)
    │   ├── App.css              # Estilos + animações
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

---

## 📝 Endpoints da API

### `POST /chat`

**Requisição:**
```json
{
  "mensagem": "minha internet caiu"
}
```

**Resposta (Sucesso):**
```json
{
  "mensagem": "minha internet caiu",
  "resposta": "Por favor, reinicie o roteador e aguarde 2 minutos.",
  "sucesso": true
}
```

**Resposta (Erro):**
```json
{
  "erro": "Mensagem vazia",
  "sucesso": false
}
```

### `GET /health`

Verifica se a API está ativa.

**Resposta:**
```json
{
  "status": "ok",
  "mensagem": "Chatbot Interfocus está ativo"
}
```

---

## 🐛 Troubleshooting

### Erro: "Não consegui conectar com o chatbot"

**Solução:**
1. Verifique se o servidor Python está rodando (`python app.py`)
2. Confirme que está em `http://localhost:5000`
3. Verifique se não há outro processo usando a porta 5000

### Erro: CORS bloqueado

**Solução:**
- O Flask já tem CORS configurado. Se ainda houver problemas, reinicie ambos os servidores.

### Erro: Módulos Python não encontrados

**Solução:**
```bash
pip install -r requirements.txt
```

---

## 🎯 Próximos Passos (Sugestões)

1. **Adicionar persistência de dados** (salvar histórico de chats)
2. **Melhorar a knowledge base** (adicionar mais respostas)
3. **Autenticação de usuários** (login/registro)
4. **Deploy em produção** (Heroku, Vercel, AWS, etc.)
5. **Integração com banco de dados** (para histórico de chats)

---

## 📞 Suporte

Se tiver dúvidas ou problemas, verifique:
- Se ambos os servidores estão rodando
- Se as portas 5000 (Python) e 5173 (React) estão disponíveis
- Os logs do navegador (F12 → Console)
- Os logs do terminal do Python

---

**Desenvolvido com ❤️ - Interfocus**
