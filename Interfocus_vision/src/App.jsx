import { useState, useRef, useEffect } from 'react'
import './App.css'

// Configuração da API
const API_URL = 'http://localhost:5000' 
// const API_URL = 'https://chatbot-interfocus.onrender.com'

const SparkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor"/>
    <path d="M19 16L19.75 18.25L22 19L19.75 19.75L19 22L18.25 19.75L16 19L18.25 18.25L19 16Z" fill="currentColor" opacity="0.7"/>
    <path d="M5 3L5.5 4.5L7 5L5.5 5.5L5 7L4.5 5.5L3 5L4.5 4.5L5 3Z" fill="currentColor" opacity="0.5"/>
  </svg>
)

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" fill="currentColor"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

function App() {
  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [paginaCarregada, setPaginaCarregada] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setPaginaCarregada(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if(chatRef.current){
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensagens]);

  async function enviarMensagem(){
    if(mensagem.trim() === "") return;

    const novaMensagem = { texto: mensagem, autor: "usuario" };
    setMensagens((prev) => [...prev, novaMensagem]);
    const mensagemEnviada = mensagem;
    setMensagem("");
    setCarregando(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensagem: mensagemEnviada })
      });

      if (!response.ok) throw new Error('Erro ao conectar com o chatbot');

      const dados = await response.json();
      setMensagens((prev) => [...prev, { texto: dados.resposta, autor: "bot" }]);

    } catch (erro) {
      console.error('Erro:', erro);
      setMensagens((prev) => [...prev, {
        texto: "❌ Desculpe, não consegui conectar com o chatbot. Verifique se o servidor Python está rodando.",
        autor: "bot"
      }]);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className={`appShell ${paginaCarregada ? 'pagina-visivel' : ''}`}>
      <div className='appContainer'>
        <div className='espaçamento'>

          <header className='header-animado'>
            <div className='brand'>
              <h2>Interfocus<span>ChatBot</span></h2>
            </div>
            <img className='intefocus_logo' src="src/assets/interfocus_logo.png" alt="Interfocus Logo" />
          </header>

          {mensagens.length === 0 ? (

            /* ── TELA INICIAL ── */
            <div className='mensagem_inicial'>
              <div className='orb orb-1'></div>
              <div className='orb orb-2'></div>

              <div className='mensagem_inicial_inner'>

                <div className='iv-icon-wrapper'>
                  <div className='iv-icon-ring'></div>
                  <div className='iv-icon'>
                    <SparkIcon />
                  </div>
                </div>

                <div className='iv-nome'>
                  <span className='iv-nome-prefixo'>Interfocus</span>
                  <span className='iv-nome-destaque'>Vision</span>
                </div>

                <p className='iv-tagline'>Seu assistente de suporte inteligente</p>

                <div className='divisor-inicial'>
                  <span className='divisor-ponto'></span>
                  <span className='divisor-linha'></span>
                  <span className='divisor-ponto'></span>
                </div>

                <label className='mensagem_3'>
                  Bem-vindo(a)! Descreva seu problema em poucas palavras e eu te ajudo.
                </label>

                {/* <div className='iv-badges'>
                  <span className='badge'>⚡ Rápido</span>
                  <span className='badge'>🎯 Preciso</span>
                  <span className='badge'>🕐 24h</span>
                </div> */}

              </div>
            </div>

          ) : (

            /* ── CHAT ── */
            <div className="chat" ref={chatRef}>
              {mensagens.map((msg, index) => (

                msg.autor === "usuario" ? (

                  /* Mensagem do Usuário */
                  <div key={index} className="msg-grupo msg-grupo--usuario">
                    <div className="msg-header msg-header--usuario">
                      <span className="msg-sender msg-sender--usuario">Você</span>
                      <div className="user-avatar">
                        <UserIcon />
                      </div>
                    </div>
                    <div className="msg-bubble msg-bubble--usuario">
                      {msg.texto}
                    </div>
                  </div>

                ) : (

                  /* Mensagem do Bot */
                  <div key={index} className="msg-grupo msg-grupo--bot">
                    <div className="msg-header">
                      <div className="bot-avatar">
                        <SparkIcon />
                      </div>
                      <span className="msg-sender msg-sender--bot">Interfocus Vision</span>
                    </div>
                    <div className="msg-bubble msg-bubble--bot">
                      {msg.texto}
                    </div>
                  </div>

                )
              ))}

              {carregando && (
                <div className="msg-grupo msg-grupo--bot">
                  <div className="msg-header">
                    <div className="bot-avatar bot-avatar--pulsando">
                      <SparkIcon />
                    </div>
                    <span className="msg-sender msg-sender--bot">Interfocus Vision</span>
                  </div>
                  <div className="msg-bubble msg-bubble--bot msg-bubble--loading">
                    <span className="ponto"></span>
                    <span className="ponto"></span>
                    <span className="ponto"></span>
                  </div>
                </div>
              )}
            </div>

          )}

          <div className='retangulo_resposta'>
            <input
              type="text"
              placeholder='Digite seu problema...'
              className='input'
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !carregando) enviarMensagem() }}
              disabled={carregando}
            />
            <button
              className='btn-enviar'
              onClick={enviarMensagem}
              disabled={carregando}
              aria-label="Enviar mensagem"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App