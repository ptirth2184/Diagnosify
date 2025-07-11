// src/context/SymptomContext.js
import React, { createContext, useContext, useState } from "react";

const SymptomContext = createContext();

export const SymptomProvider = ({ children }) => {
  const [symptoms, setSymptoms] = useState([]);

  const addSymptom = (symptom) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms((prev) => [...prev, symptom]);
    }
  };
  

  return (
    <SymptomContext.Provider value={{ symptoms, addSymptom }}>
      {children}
    </SymptomContext.Provider>
  );
};

export const useSymptomContext = () => useContext(SymptomContext);
