import subprocess
import time
import requests
import ollama
from flask import Flask, request, jsonify

app = Flask(__name__)

def is_ollama_running():
    """Check if Ollama is already running by sending a request to its API."""
    try:
        response = requests.get("http://localhost:11434/api/tags", timeout=2)
        return response.status_code == 200
    except requests.ConnectionError:
        return False

def start_ollama_server():
    """Start Ollama in the background if it's not already running."""
    if not is_ollama_running():
        print("Starting Ollama server...")
        subprocess.Popen(["ollama", "serve"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        time.sleep(5)

@app.route("/generate", methods=["POST"])
def generate():
    """API endpoint to process requests from the Express backend."""
    data = request.json
    prompt = data.get("prompt", "")

    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    try:
        # Query DeepSeek model
        response = ollama.chat(
            model="deepseek-r1:7b",
            messages=[{"role": "user", "content": prompt}],
            options={"temperature": 0.7, "max_tokens": 100}
        )
        generated_text = response["message"]["content"]
        return jsonify({"response": generated_text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    start_ollama_server()
    app.run(host="0.0.0.0", port=4000, debug=True)
