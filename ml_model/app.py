# ml_model/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import pickle
import numpy as np

from predict import predict_disease  # your existing disease prediction function

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from React frontend

# Load knowledge base
with open("ml_model/disease_knowledge.json") as f:
    disease_knowledge = json.load(f)

# Load vectorizer and model for chatbot
vectorizer = pickle.load(open("ml_model/vectorizer.pkl", "rb"))
model = pickle.load(open("ml_model/model.pkl", "rb"))

# Home route
@app.route("/")
def home():
    return "Diagnosify ML Model API is running!"

# Route to predict disease based on symptom vector (used by form-based page)
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    if not data or "symptoms_vector" not in data:
        return jsonify({"error": "Missing symptoms_vector"}), 400

    symptoms_vector = data["symptoms_vector"]
    
    try:
        result = predict_disease(symptoms_vector)
        return jsonify({"predicted_disease": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to handle chatbot queries (free-text)
@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.get_json()
    message = data.get("message", "").lower().strip()

    # 1. If message includes a known disease, return its info
    for disease in disease_knowledge:
        if disease in message:
            info = disease_knowledge[disease]
            return jsonify({
                "type": "info",
                "disease": disease,
                "description": info["description"],
                "foods_to_eat": info["foods_to_eat"],
                "foods_to_avoid": info["foods_to_avoid"]
            })

    # 2. Otherwise, treat as symptom input and predict disease
    try:
        X = vectorizer.transform([message])
        prediction = model.predict(X)[0]
        info = disease_knowledge.get(prediction, {})

        return jsonify({
            "type": "prediction",
            "predicted_disease": prediction,
            "description": info.get("description", "N/A"),
            "foods_to_eat": info.get("foods_to_eat", []),
            "foods_to_avoid": info.get("foods_to_avoid", [])
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
