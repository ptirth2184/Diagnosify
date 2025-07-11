import React, { useState } from "react";
import { useSymptomContext } from "../context/SymptomContext";
import { useNavigate } from "react-router-dom";
import symptomsList from "../data/symptoms";

const Chatbot = () => {
  const { symptoms, addSymptom } = useSymptomContext();
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Tell me your symptoms, or type 'predict'." },
  ]);
  const [input, setInput] = useState("");
  const [predictedDisease, setPredictedDisease] = useState(null);
  const navigate = useNavigate();

  const handlePredict = async () => {
    const symptomsVector = symptomsList.map((sym) =>
      symptoms.includes(sym) ? 1 : 0
    );

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms_vector: symptomsVector }),
      });

      const data = await res.json();
      if (data.predicted_disease) {
        setPredictedDisease(data.predicted_disease);
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: `Based on your symptoms, you may have ${data.predicted_disease}.`,
          },
          { sender: "bot", text: "Click below to learn more." },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Sorry, I couldn't make a prediction." },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to the prediction server." },
      ]);
    }
  };

  const handleAddSymptom = () => {
    if (input) {
      if (!symptoms.includes(input)) {
        addSymptom(input);
        setMessages((prev) => [
          ...prev,
          { sender: "user", text: input },
          { sender: "bot", text: "Symptom added. Anything else?" },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "You've already added this symptom." },
        ]);
      }
      setInput("");
    }
  };

  const handleReset = () => {
    setMessages([
      { sender: "bot", text: "Hi! Tell me your symptoms, or type 'predict'." },
    ]);
    setInput("");
    setPredictedDisease(null);
    // Optional: clear symptom context (if implemented)
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "650px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>🩺 Diagnosify Chatbot</h2>

      {/* Chat Window */}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "1rem",
          height: "400px",
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#daf1ff" : "#e4e4e4",
              color: "#000",
              padding: "0.6rem 1rem",
              borderRadius: "20px",
              maxWidth: "80%",
              whiteSpace: "pre-wrap",
            }}
          >
            <strong>{msg.sender === "bot" ? "🤖" : "🧑"} </strong>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ marginTop: "1.5rem" }}>
        <select
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: "5px", width: "100%" }}
        >
          <option value="">Select a symptom</option>
          {symptomsList.map((sym, idx) => (
            <option key={idx} value={sym}>
              {sym.replaceAll("_", " ")}
            </option>
          ))}
        </select>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <button
            onClick={handleAddSymptom}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              backgroundColor: "#2196f3",
              color: "#fff",
              border: "none",
            }}
          >
            Add Symptom
          </button>

          <button
            onClick={handlePredict}
            disabled={symptoms.length === 0}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              backgroundColor: symptoms.length === 0 ? "#aaa" : "#673ab7",
              color: "#fff",
              border: "none",
              cursor: symptoms.length === 0 ? "not-allowed" : "pointer",
            }}
          >
            Predict
          </button>

          {predictedDisease && (
            <button
              onClick={() => navigate(`/info/${predictedDisease}`)}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Learn More
            </button>
          )}

          <button
            onClick={handleReset}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Display Added Symptoms */}
      <div style={{ marginTop: "1.5rem" }}>
        <strong>📝 Symptoms you've added:</strong>
        <div
          style={{
            marginTop: "0.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {symptoms.map((sym, idx) => (
            <span
              key={idx}
              style={{
                backgroundColor: "#d1ecf1",
                padding: "0.4rem 0.8rem",
                borderRadius: "15px",
                fontSize: "0.9rem",
              }}
            >
              {sym.replaceAll("_", " ")}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
