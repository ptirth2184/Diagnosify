// src/pages/DiseaseInfo.js

import React from "react";
import { useParams } from "react-router-dom";

const diseaseExplanations = {
  "common cold": {
    cause: "Viral infection (rhinovirus, etc.)",
    symptoms: "Sneezing, runny nose, sore throat, mild fever",
    contagious: "Yes, spreads through droplets",
    treatment: "Rest, fluids, OTC meds for symptoms"
  },
  "covid-19": {
    cause: "SARS-CoV-2 virus",
    symptoms: "Fever, cough, shortness of breath, loss of taste/smell",
    contagious: "Highly contagious",
    treatment: "Isolation, supportive care, antiviral drugs (if prescribed)"
  },
  "dengue": {
    cause: "Dengue virus from mosquito bites",
    symptoms: "High fever, joint/muscle pain, rash, fatigue",
    contagious: "Not contagious person-to-person",
    treatment: "Fluids, rest, acetaminophen (avoid NSAIDs)"
  },
  "flu": {
    cause: "Influenza virus",
    symptoms: "Fever, chills, muscle aches, cough, congestion",
    contagious: "Yes, spreads via droplets",
    treatment: "Rest, fluids, antiviral drugs if early"
  },
  "food poisoning": {
    cause: "Bacteria/virus in contaminated food (e.g., Salmonella, E. coli)",
    symptoms: "Nausea, vomiting, diarrhea, stomach cramps",
    contagious: "Sometimes contagious via fecal-oral route",
    treatment: "Fluids, bland food, ORS, rest"
  },
  "gastritis": {
    cause: "Inflammation of stomach lining (due to H. pylori, NSAIDs, etc.)",
    symptoms: "Upper abdominal pain, bloating, nausea",
    contagious: "No",
    treatment: "Antacids, dietary changes, antibiotics if bacterial"
  },
  "malaria": {
    cause: "Plasmodium parasites via mosquito bites",
    symptoms: "Fever, chills, sweats, fatigue, nausea",
    contagious: "Not directly contagious",
    treatment: "Antimalarial drugs (depends on species)"
  },
  "migraine": {
    cause: "Neurological condition (triggers: stress, food, hormones)",
    symptoms: "Throbbing headache, nausea, sensitivity to light/sound",
    contagious: "No",
    treatment: "Pain relievers, rest, avoid triggers"
  },
  "pneumonia": {
    cause: "Bacterial, viral, or fungal lung infection",
    symptoms: "Cough, fever, difficulty breathing, chest pain",
    contagious: "Some types are contagious",
    treatment: "Antibiotics/antivirals, rest, fluids"
  },
  "typhoid": {
    cause: "Salmonella typhi bacteria (contaminated food/water)",
    symptoms: "High fever, abdominal pain, weakness, rash",
    contagious: "Yes, through fecal-oral route",
    treatment: "Antibiotics, rest, fluids"
  }
};

const DiseaseInfo = () => {
  const { disease } = useParams();
  const info = diseaseExplanations[disease?.toLowerCase()];

  if (!info) {
    return <div className="p-6 text-red-500 text-center">Disease not found.</div>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 capitalize">{disease}</h1>
      <ul className="space-y-3 text-lg">
        <li><strong>Cause:</strong> {info.cause}</li>
        <li><strong>Symptoms:</strong> {info.symptoms}</li>
        <li><strong>Contagious:</strong> {info.contagious}</li>
        <li><strong>Treatment:</strong> {info.treatment}</li>
      </ul>
    </div>
  );
};

export default DiseaseInfo;
