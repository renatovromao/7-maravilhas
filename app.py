from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = "chave-secreta-do-mini-game"

# Nome correto (case insensitive)
ACCESS_KEYS = ["renato", "agatha"]

# -------------------------
# INDEX / APRESENTACAO DO JOGO
# -------------------------
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        return redirect(url_for("login"))
    return render_template("index.html")


# -------------------------
# LOGIN / ESCOLHA PERSONAGEM
# -------------------------
@app.route("/login", methods=["GET", "POST"])
def login():
    error = None

    if request.method == "GET":
        session.clear()

    if request.method == "POST":
        nome = request.form.get("nome", "").strip()
        personagem = request.form.get("personagem")

        if nome.lower() not in ACCESS_KEYS:
            error = "Nome incorreto. Tente novamente."
            return render_template("login.html", error=error)

        if personagem not in ["personagem1", "personagem2"]:
            error = "Escolha um personagem para continuar."
            return render_template("login.html", error=error)

        session["autorizado"] = True
        session["etapa"] = 1
        session["personagem"] = personagem
        session["pontos"] = 0

        return redirect(url_for("como_jogar"))

    return render_template("login.html", error=error)


# -------------------------
# COMO JOGAR
# -------------------------
@app.route("/como-jogar")
def como_jogar():
    if not session.get("autorizado"):
        return redirect(url_for("login"))
    return render_template("como_jogar.html")


@app.route("/iniciar-jogo", methods=["POST"])
def iniciar_jogo():
    if not session.get("autorizado"):
        return redirect(url_for("login"))

    session["etapa"] = 1
    return redirect(url_for("etapa1"))


# -------------------------
# ETAPA 1
# -------------------------
@app.route("/etapa1")
def etapa1():
    if not session.get("autorizado") or session.get("etapa") != 1:
        return redirect(url_for("login"))
    return render_template("etapa1.html")


@app.route("/etapa1/complete", methods=["POST"])
def etapa1_complete():
    if not session.get("autorizado"):
        return redirect(url_for("login"))

    session["pontos"] += 10
    session["etapa"] = 2
    return redirect(url_for("etapa2"))


# -------------------------
# ETAPA 2
# -------------------------
@app.route("/etapa2")
def etapa2():
    if not session.get("autorizado") or session.get("etapa") != 2:
        return redirect(url_for("login"))
    return render_template("etapa2.html")


@app.route("/etapa2/complete", methods=["POST"])
def etapa2_complete():
    if not session.get("autorizado"):
        return redirect(url_for("login"))

    session["pontos"] += 10
    session["etapa"] = 3
    return redirect(url_for("etapa3"))


# -------------------------
# ETAPA 3
# -------------------------
@app.route("/etapa3")
def etapa3():
    if not session.get("autorizado") or session.get("etapa") != 3:
        return redirect(url_for("login"))
    return render_template("etapa3.html")


@app.route("/etapa3/complete", methods=["POST"])
def etapa3_complete():
    if not session.get("autorizado"):
        return redirect(url_for("login"))

    session["pontos"] += 10
    session["etapa"] = 4
    return redirect(url_for("etapa4"))


# -------------------------
# ETAPA 4
# -------------------------
@app.route("/etapa4")
def etapa4():
    if not session.get("autorizado") or session.get("etapa") != 4:
        return redirect(url_for("login"))
    return render_template("etapa4.html")


@app.route("/etapa4/complete", methods=["POST"])
def etapa4_complete():
    if not session.get("autorizado"):
        return redirect(url_for("login"))

    # Marca que chegou ao final (tela final virá depois)
    session["pontos"] += 10
    session["etapa"] = "final"
    return redirect(url_for("final"))


# -------------------------
# TELA FINAL
# -------------------------
@app.route("/final")
def final():
    if not session.get("autorizado") or session.get("etapa") != "final":
        return redirect(url_for("login"))
    return render_template("final.html")


# -------------------------
# REINICIAR (volta etapa 1)
# -------------------------
@app.route("/reiniciar", methods=["POST"])
def reiniciar():
    if not session.get("autorizado"):
        return redirect(url_for("login"))

    session["pontos"] = 0
    session["etapa"] = 1
    return redirect(url_for("etapa1"))


# -------------------------
# SAIR (volta login)
# -------------------------
@app.route("/sair", methods=["POST"])
def sair():
    session.clear()
    return redirect(url_for("index"))


# -------------------------
# START
# -------------------------
#if __name__ == "__main__":
#    app.run(debug=True)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
