import React, { useState } from "react";
import { useSymptomContext } from "../context/SymptomContext";
import { useNavigate } from "react-router-dom";
import symptomsList from "../data/symptoms";

const Chatbot = () => {
  const { symptoms, addSymptom } = useSymptomContext();
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Select symptoms below or type commands like 'predict' or 'info'." },
  ]);
  const [input, setInput] = useState("");
  const [dropdownSymptom, setDropdownSymptom] = useState(""); // new
  const [predictedDisease, setPredictedDisease] = useState(null);
  const navigate = useNavigate();

  const handleDropdownAdd = () => {
    if (dropdownSymptom && !symptoms.includes(dropdownSymptom)) {
      addSymptom(dropdownSymptom);
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: dropdownSymptom },
        { sender: "bot", text: "Symptom added. Anything else?" },
      ]);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim().toLowerCase();
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    if (userMessage === "predict") {
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
              text: `Based on your symptoms, you may have ${data.predicted_disease}. Type 'info' to learn more.`,
            },
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
    } else if (userMessage === "info" && predictedDisease) {
      navigate(`/info/${predictedDisease}`);
    } else {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Please use the dropdown to select valid symptoms." },
      ]);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Chatbot</h2>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          height: "300px",
          overflowY: "auto",
          marginBottom: "1rem",
        }}
      >
        {messages.map((msg, index) => (
          <p key={index} style={{ color: msg.sender === "bot" ? "green" : "blue" }}>
            <strong>{msg.sender === "bot" ? "Bot:" : "You:"}</strong> {msg.text}
          </p>
        ))}
      </div>

      {/* Dropdown to select symptoms */}
      <div style={{ marginBottom: "1rem" }}>
        <select
          value={dropdownSymptom}
          onChange={(e) => setDropdownSymptom(e.target.value)}
        >
          <option value="">-- Select a symptom --</option>
          {symptomsList.map((sym) => (
            <option key={sym} value={sym}>
              {sym.replaceAll("_", " ")}
            </option>
          ))}
        </select>
        <button onClick={handleDropdownAdd} style={{ marginLeft: "1rem" }}>
          Add Symptom
        </button>
      </div>

      {/* Input for commands like 'predict' */}
      <input
        type="text"
        placeholder="Type a command (predict/info)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        style={{ width: "80%", marginRight: "1rem" }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chatbot;
