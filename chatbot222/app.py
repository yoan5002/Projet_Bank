from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from openai import OpenAI
import os

client = OpenAI(api_key="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")

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from openai import OpenAI
import os



app = Flask(__name__, static_folder="frontend")
CORS(app)

@app.route("/")
def serve_index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/style.css")
def serve_css():
    return send_from_directory(app.static_folder, "style.css")

@app.route("/script.js")
def serve_js():
    return send_from_directory(app.static_folder, "script.js")

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
           {"role": "system", "content": "Tu es un conseiller bancaire de la banque Hoobank. "
           "Tu donnes uniquement des conseils en lien avec les services de la banque : "
           "comptes, prêts, sécurité bancaire, économies, investissements et cybersécurité. "
           "Ne réponds jamais à des questions hors contexte bancaire."},
            {"role": "user", "content": user_input}
        ]
    )

    message = response.choices[0].message.content
    return jsonify({"response": message})

if __name__ == "__main__":
    app.run(debug=True)
