import { useState, useRef, useEffect } from 'react'
import './App.css'

// Configuração da API
// const API_URL = 'http://localhost:5000' 
const API_URL = 'https://chatbot-interfocus.onrender.com'


function App() {
  const [count, setCount] = useState(0)
  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if(chatRef.current){
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensagens]);

  async function enviarMensagem(){
    if(mensagem.trim() === "") return;

    const novaMensagem = {
      texto: mensagem,
      autor: "usuario"
    };

    setMensagens((prev) => [
      ...prev,
      novaMensagem
    ]);

    const mensagemEnviada = mensagem;
    setMensagem("");
    setCarregando(true);

    try {
      // Chamada para a API do chatbot
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mensagem: mensagemEnviada
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao conectar com o chatbot');
      }

      const dados = await response.json();
      
      // Resposta do bot
      const respostaBot = {
        texto: dados.resposta,
        autor: "bot"
      };

      setMensagens((prev) => [
        ...prev,
        respostaBot
      ]);

    } catch (erro) {
      console.error('Erro:', erro);
      
      // Mensagem de erro
      const respostaErro = {
        texto: "❌ Desculpe, não consegui conectar com o chatbot. Verifique se o servidor Python está rodando.",
        autor: "bot"
      };

      setMensagens((prev) => [
        ...prev,
        respostaErro
      ]);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <>
    <div className='espaçamento'>
      <header>
        <h2 for="">Interfocus<span>ChatBot</span></h2>
        <img className='intefocus_logo' src="src/assets/interfocus_logo.png" alt=""></img>
      </header>

      {/* SE NÃO TIVER MENSAGEM, MOSTRA A TELA INICIAL */}
      {mensagens.length === 0 ? (

        <div className='mensagem_inicial'>
        <label className='mensagem_1' htmlFor="">Bem vindo(a) ao</label> <br />
        <label className='mensagem_2' htmlFor="">ChatBot da Interfocus!</label> <br />
        <label className='mensagem_3' htmlFor="">Por favor, em poucas palavras descreva seu problema.</label>
      </div>

      ) : (

        /* SE TIVER MENSAGEM, MOSTRA O CHAT */
        <div className="chat" ref={chatRef}>
          {mensagens.map((msg, index) => (
            <div 
            key={index} 
            className={
              msg.autor === "usuario"
              ? "mensagemUsuario"
              : "mensagemBot"
            }>
              {msg.texto}
            </div>
          ))}
          {carregando && (
            <div className="mensagemBot">
              <span className="digitando">Digitando</span>
              <span className="ponto">.</span>
              <span className="ponto">.</span>
              <span className="ponto">.</span>
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
            onChange={(e) =>
              setMensagem(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !carregando) {
                enviarMensagem()
              }
            }}
            disabled={carregando}
          />
        <img 
          className='enviado' 
          src="src/assets/enviado.png" 
          alt="Enviar" 
          onClick={enviarMensagem}
          style={{ opacity: carregando ? 0.5 : 1, cursor: carregando ? 'not-allowed' : 'pointer' }}
        />
      </div>
    </div>
    </>
  )
}

export default App
