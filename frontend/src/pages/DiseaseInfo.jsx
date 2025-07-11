import React from "react";
import { useParams } from "react-router-dom";
import diseaseInfo from "../data/diseaseInfo";

const DiseaseInfo = () => {
  const { disease } = useParams();
  const info = diseaseInfo[disease];

  if (!info) {
    return <div style={{ padding: "2rem" }}><h2>No information found for "{disease}"</h2></div>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1rem", color: "#2c3e50" }}>{info.name}</h1>
      <p><strong>Description:</strong> {info.description}</p>
      <p><strong>Common Symptoms:</strong> {info.symptoms.join(", ")}</p>
      <p><strong>Treatment:</strong> {info.treatment}</p>
      <p><strong>Prevention:</strong> {info.prevention}</p>

      <div style={{ marginTop: "1rem" }}>
        <h3 style={{ marginBottom: "0.5rem" }}>🟢 Recommended Foods:</h3>
        <ul>
          {info.food.recommended.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>🔴 Foods to Avoid:</h3>
        <ul>
          {info.food.avoid.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiseaseInfo;
