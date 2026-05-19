# 🤖 Interfocus ChatBot - Integração Python + React

Integração profissional de um chatbot Python (TF-IDF + Similaridade de Cosseno) com uma interface React moderna.

## 🎯 O que foi feito

✅ **Backend (Python)**
- API Flask com endpoints RESTful
- CORS habilitado para comunicação com React
- Função de resposta do chatbot mantida intacta
- Health check endpoint

✅ **Frontend (React)**
- Integração com API do backend
- Indicador de carregamento com animação
- Tratamento de erros
- Scroll automático do chat
- Input desabilitado durante requisição

✅ **Estrutura**
- Mantida a organização original
- Arquivos separados e bem documentados
- Scripts de inicialização para facilitar execução

---

## 📦 Quick Start

### Opção 1: Scripts de Inicialização (Recomendado)

**Windows:**
```bash
START.bat
```

**macOS/Linux:**
```bash
bash start.sh
```

### Opção 2: Manual

**Terminal 1 - Backend:**
```bash
cd chatbot-interfocus
pip install -r requirements.txt
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd Interfocus_vision
npm install
npm run dev
```

---

## 🌐 Acessar

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

---

## 📚 Documentação Completa

Veja [GUIA_INTEGRACAO.md](./GUIA_INTEGRACAO.md) para instruções detalhadas.

---

## 🔄 Fluxo de Comunicação

```
React → POST /chat → Flask → TF-IDF → Resposta
```

1. Usuário digita mensagem no React
2. Requisição POST enviada para `http://localhost:5000/chat`
3. Backend processa com TF-IDF
4. Resposta retorna em JSON
5. React exibe a resposta no chat

---

## 📁 Estrutura de Arquivos

```
INTERFOCUS/
├── chatbot-interfocus/
│   ├── app.py                 # ✨ API Flask (modificado)
│   ├── knowledge_base.py      # Base de conhecimento
│   ├── requirements.txt       # ✨ Com Flask + CORS
│   └── .env.example          # Configurações
│
├── Interfocus_vision/
│   └── src/
│       ├── App.jsx           # ✨ Integrado com API
│       └── App.css           # ✨ Com animações
│
├── GUIA_INTEGRACAO.md        # Documentação completa
├── START.bat                 # Script para Windows
├── start.sh                  # Script para macOS/Linux
└── README.md                 # Este arquivo
```

---

## ⚙️ Tecnologias Utilizadas

**Backend:**
- Python 3.8+
- Flask (REST API)
- Flask-CORS (Cross-Origin)
- scikit-learn (TF-IDF)
- NLTK

**Frontend:**
- React 19
- Vite 8
- CSS3 com animações

---

## 🚀 Melhorias Implementadas

✨ Converteu app.py em API REST
✨ Adicionou endpoints `/chat` e `/health`
✨ Integrou fetch na aplicação React
✨ Adicionou indicador de carregamento
✨ Tratamento robusto de erros
✨ Animação "digitando..." profissional
✨ CORS configurado corretamente

---

## 🔒 Segurança

- CORS configurado apenas para localhost
- Validação de mensagens vazias
- Tratamento de exceções no backend
- Input desabilitado durante requisição

---

## 💡 Próximas Etapas (Sugestões)

- [ ] Adicionar autenticação de usuários
- [ ] Persistir histórico de chats em banco de dados
- [ ] Melhorar a knowledge base
- [ ] Deploy em produção (Heroku, AWS, etc.)
- [ ] Adicionar testes automatizados
- [ ] Logging centralizado

---

## 📝 Notas

- A estrutura original do React foi **mantida intacta**
- A lógica do chatbot Python **continua a mesma**
- Apenas foram adicionadas as camadas de API e integração
- Tudo foi desenvolvido de forma **profissional e escalável**

---

## 📞 Suporte

Verifique o [GUIA_INTEGRACAO.md](./GUIA_INTEGRACAO.md) para troubleshooting completo.

---

**Desenvolvido com ❤️ - Integração Profissional**
