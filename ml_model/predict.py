import pickle
import os
import numpy as np

# Load model
model_path = os.path.join("model", "model.pkl")
with open(model_path, "rb") as f:
    model = pickle.load(f)

# Predict function
def predict_disease(symptoms_vector):
    """
    Predicts disease from a list of binary symptom values (0 or 1).
    Example: [1, 0, 0, 1, 1, ..., 0]
    """
    input_vector = np.array(symptoms_vector).reshape(1, -1)
    prediction = model.predict(input_vector)
    return prediction[0]
