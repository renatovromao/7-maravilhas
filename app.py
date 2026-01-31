import os
from flask import Flask, render_template
from datetime import datetime
from flask import request
import logging
from zoneinfo import ZoneInfo

logging.basicConfig(level=logging.INFO)

app = Flask(__name__)

@app.context_processor
def inject_now():
    return {'now': datetime.utcnow}

@app.route("/")
def home():
    ip = request.headers.get("X-Forwarded-For", request.remote_addr)
    user_agent = request.headers.get("User-Agent")
    timestamp = datetime.now(ZoneInfo("America/Sao_Paulo")).strftime("%Y-%m-%d %H:%M:%S")

    logging.info(f"Acesso | DataHora={timestamp} | IP={ip} | UA={user_agent}")

    maravilhas = [
        {
            "nome_antes": "Agatha",
            "apelido": "Socialite",
            "nome_depois": "Amaral",
            "percentual": "100%",
            "imagem": "maravilha1.jpg",
            "descricao": 'Ela desfila entre taças de champanhe como quem domina o mundo. Um olhar <strong>sofisticado</strong>, uma postura <strong>inalcançável</strong> e um charme que faz qualquer evento parecer pequeno perto dela.'
        },
        {
            "nome_antes": "Agatha",
            "apelido": "Cleópatra",
            "nome_depois": "Amaral",
            "percentual": "100%",
            "imagem": "maravilha2.jpg",
            "descricao": 'Rainha sem precisar de trono, dona de um olhar <strong>hipnotizante</strong> e uma presença <strong>imperial</strong>. Se o Nilo ainda existisse, certamente correria por ela.'
        },
        {
            "nome_antes": "Agatha",
            "apelido": "Princesa",
            "nome_depois": "Amaral",
            "percentual": "100%",
            "imagem": "maravilha3.jpg",
            "descricao": 'Delicada como um conto de fadas, mas forte como quem escreve o próprio destino. Um sorriso <strong>doce</strong>, uma alma <strong>encantadora</strong> e um coração real.'
        },
        {
            "nome_antes": "Agatha",
            "apelido": "Mendiga",
            "nome_depois": "Amaral",
            "percentual": "100%",
            "imagem": "maravilha4.jpg",
            "descricao": 'Prova viva de que a beleza não mora nas roupas, mas no olhar. Mesmo sem nada, sobra <strong>verdade</strong>, <strong>intensidade</strong> e um charme que dinheiro nenhum compra.'
        },
        {
            "nome_antes": "Agatha",
            "apelido": "Geek",
            "nome_depois": "Amaral",
            "percentual": "100%",
            "imagem": "maravilha5.jpg",
            "descricao": 'Entre códigos, referências e universos paralelos, ela é a exceção perfeita. Inteligência <strong>afiada</strong>, humor <strong>imprevisível</strong> e um coração digno de maratona.'
        },
        {
            "nome_antes": "Agatha",
            "apelido": "Gótica",
            "nome_depois": "Amaral",
            "percentual": "100%",
            "imagem": "maravilha6.jpg",
            "descricao": 'Mistério em forma de gente. Um olhar <strong>profundo</strong>, uma estética <strong>sombria</strong> e um coração que pulsa poesia no escuro.'
        },
        {
            "nome_antes": "Agatha",
            "apelido": "Rockeira",
            "nome_depois": "Amaral",
            "percentual": "100%",
            "imagem": "maravilha7.jpg",
            "descricao": 'Livre, intensa e barulhenta do jeito certo. Vive no volume máximo, ama sem freio e carrega uma alma <strong>indomável</strong> que nunca passa despercebida.'
        }
    ]

    return render_template("index.html", maravilhas=maravilhas)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
