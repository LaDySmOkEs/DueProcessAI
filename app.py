
from flask import Flask, render_template, request
import os
import datetime
import openai
from dotenv import load_dotenv

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def ask_openai(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful legal assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=800
    )
    return response.choices[0].message['content']

def analyzer_route(route, title, description, placeholder):
    @app.route(route, methods=["GET", "POST"])
    def route_func():
        result = ""
        if request.method == "POST":
            input_text = request.form.get("input_text")
            result = ask_openai(input_text)
            with open(f"{UPLOAD_FOLDER}/{route.strip('/')}_log.txt", "a") as f:
                f.write(f"{datetime.datetime.now()}\n{input_text}\n---\n{result}\n\n")
        return render_template("analyzer.html", title=title, description=description, placeholder=placeholder, result=result)
    return route_func

analyzer_route("/charge_interpreter", "Charge Interpreter", "Paste a legal charge or statute to get a simplified explanation.", "e.g., NRS 200.481")
analyzer_route("/document_risk_checker", "Document Risk Checker", "Paste a legal motion to receive AI-powered feedback and risk analysis.", "Paste your motion or legal document here...")
analyzer_route("/evidence_analysis", "Evidence Analysis Tool", "Paste or describe evidence to classify it and get usage suggestions.", "Paste evidence notes or transcription...")
analyzer_route("/due_process_analyzer", "Due Process Analyzer", "Describe your experience to detect potential due process violations.", "Describe what happened in your case...")

@app.route("/start_case", methods=["GET", "POST"])
def start_case():
    return render_template("start_case.html")

@app.route("/")
def home():
    return render_template("analyzer.html", title="Welcome to Due Process AI", description="Choose a tool from the menu to begin.", placeholder="")

if __name__ == "__main__":
    app.run(debug=True)
