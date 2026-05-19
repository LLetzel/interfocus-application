# Biblioteca para vetorização textual
from sklearn.feature_extraction.text import TfidfVectorizer

# Biblioteca para cálculo de similaridade
from sklearn.metrics.pairwise import cosine_similarity

# Importa nossa base de conhecimento
from knowledge_base import knowledge_base

# tratativa de pontuação e caracteres especiais para melhor comparação dos textos
import re

import os

# Framework para criar API REST - Acessado pelo react(consulta de documentação: https://flask.palletsprojects.com/)
from flask import Flask, request, jsonify
from flask_cors import CORS



app = Flask(__name__)
CORS(app)  


def limpar_texto(texto): #limpeza de dados- melhor uniformização do texto para comparação

    texto = texto.lower()

    texto = re.sub(r'[^a-zA-ZÀ-ÿ0-9\s]', '', texto)

    return texto



problemas = [item["problema"] for item in knowledge_base] # carrega os dados da base de conhecimento - somente os problemas


#TFIDF 
# quais palavras aparecem
# quantas vezes aparecem
# quais são importantes
# quais são comuns demais
vectorizer = TfidfVectorizer()

# fit - aprende o vocabulário e a importância de cada palavra
# transform - converte os problemas em vetores numéricos
vetores_problemas = vectorizer.fit_transform(problemas) # treinamento - problemas por meio de vetores


def responder_usuario(mensagem_usuario): #chatbot função principal

    
    mensagem_limpa = limpar_texto(mensagem_usuario)

    
    vetor_usuario = vectorizer.transform([mensagem_limpa])

    
    similaridades = cosine_similarity( # compara o vetor do usuário com os vetores dos problemas conhecidos
        vetor_usuario,
        vetores_problemas
    )

    
    indice_melhor = similaridades.argmax() # índice do problema mais similar - maior valor

    
    confianca = similaridades[0][indice_melhor]

    

    
    if confianca < 0.3:
        return (
            "Não consegui identificar seu problema, consegue descrever de outra forma? Se preferir, posso encaminhar para um atendente. N: 1499999999 "
        )

    
    return knowledge_base[indice_melhor]["resposta"]


@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        mensagem_usuario = data.get('mensagem', '').strip()
        
        if not mensagem_usuario:
            return jsonify({'erro': 'Mensagem vazia'}), 400
        
        resposta = responder_usuario(mensagem_usuario)
        
        return jsonify({
            'mensagem': mensagem_usuario,
            'resposta': resposta,
            'sucesso': True
        }), 200
        
    except Exception as e:
        return jsonify({
            'erro': str(e),
            'sucesso': False
        }), 500


@app.route('/health', methods=['GET'])
def health():

    return jsonify({'status': 'ok', 'mensagem': 'Chatbot Interfocus está ativo'}), 200

if __name__ == '__main__':
    print("=== CHATBOT INTERFOCUS API ===")
    print(" Servidor iniciando...")
    print(" Endpoint: POST /chat")
    print(" CORS habilitado para React\n")

    app.run(
        host='0.0.0.0',
        port=int(os.environ.get("PORT", 5000)),
        debug=False
    )   

# if __name__ == '__main__':
#     print("=== CHATBOT INTERFOCUS API ===")
#     print("🚀 Servidor rodando em http://localhost:5000")
#     print("📡 Endpoint: POST /chat")
#     print("✅ CORS habilitado para React\n")
    
#     app.run(debug=True, host='localhost', port=5000)