import React, { useState, useEffect } from "react";
import symptomsList from "../data/symptoms";
import { useNavigate } from 'react-router-dom';

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Navigate to DiseaseInfo page when result is available
  useEffect(() => {
    if (result) {
      navigate(`/info/${result}`);
    }
  }, [result, navigate]);

  const handleSymptomChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSymptoms((prev) => [...prev, value]);
    } else {
      setSelectedSymptoms((prev) => prev.filter((sym) => sym !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const symptomsVector = symptomsList.map((symptom) =>
      selectedSymptoms.includes(symptom) ? 1 : 0
    );

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms_vector: symptomsVector }),
      });

      const data = await response.json();

      if (data.predicted_disease) {
        setResult(data.predicted_disease);
      } else {
        setResult("No prediction received.");
      }
    } catch (error) {
      setResult("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Symptom Checker</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {symptomsList.map((symptom) => (
            <label key={symptom}>
              <input
                type="checkbox"
                value={symptom}
                onChange={handleSymptomChange}
              />
              {symptom.replaceAll("_", " ")}
            </label>
          ))}
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>
          Predict Disease
        </button>
      </form>

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default SymptomChecker;
