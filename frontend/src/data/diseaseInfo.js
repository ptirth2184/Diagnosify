const diseaseInfo = {
  "common_cold": {
    name: "Common Cold",
    description: "A viral infection of the upper respiratory tract, usually mild and self-limiting.",
    symptoms: ["Sneezing", "Cough", "Sore throat", "Runny nose"],
    treatment: "Rest, fluids, over-the-counter cold remedies.",
    prevention: "Wash hands regularly, avoid close contact with sick individuals.",
    food: {
      recommended: ["Warm soups", "Herbal teas", "Fruits rich in Vitamin C"],
      avoid: ["Cold drinks", "Dairy products", "Fried food"]
    }
  },
  "covid-19": {
    name: "COVID-19",
    description: "A contagious respiratory illness caused by the SARS-CoV-2 virus.",
    symptoms: ["Fever", "Cough", "Fatigue", "Loss of taste/smell"],
    treatment: "Isolation, supportive care, antivirals in severe cases.",
    prevention: "Vaccination, mask-wearing, social distancing.",
    food: {
      recommended: ["Hydrating fluids", "Soft cooked veggies", "Lean proteins"],
      avoid: ["Processed foods", "Sugary snacks", "Alcohol"]
    }
  },
  "dengue": {
    name: "Dengue Fever",
    description: "A mosquito-borne viral infection causing high fever and body aches.",
    symptoms: ["High fever", "Severe headache", "Joint/muscle pain", "Skin rash"],
    treatment: "Supportive care, hydration, fever reducers (no aspirin).",
    prevention: "Avoid mosquito bites, use repellents and nets.",
    food: {
      recommended: ["Papaya leaf juice", "Coconut water", "Pomegranate"],
      avoid: ["Oily/spicy food", "Caffeine", "Alcohol"]
    }
  },
  "flu": {
    name: "Influenza (Flu)",
    description: "A contagious respiratory illness caused by influenza viruses.",
    symptoms: ["Fever", "Chills", "Muscle aches", "Fatigue"],
    treatment: "Rest, fluids, antivirals (if prescribed).",
    prevention: "Annual flu vaccine, good hygiene practices.",
    food: {
      recommended: ["Chicken soup", "Ginger tea", "Fruit juices"],
      avoid: ["Dairy", "Greasy foods", "Cold beverages"]
    }
  },
  "food_poisoning": {
    name: "Food Poisoning",
    description: "Illness caused by consuming contaminated food or beverages.",
    symptoms: ["Nausea", "Vomiting", "Diarrhea", "Abdominal cramps"],
    treatment: "Hydration, rest, bland diet, antibiotics (if bacterial).",
    prevention: "Cook food properly, maintain hygiene.",
    food: {
      recommended: ["Bananas", "Rice", "Toast", "Boiled potatoes"],
      avoid: ["Dairy", "Fried foods", "Spicy foods"]
    }
  },
  "gastritis": {
    name: "Gastritis",
    description: "Inflammation of the stomach lining, often due to infection or irritation.",
    symptoms: ["Stomach pain", "Bloating", "Nausea", "Loss of appetite"],
    treatment: "Antacids, proton pump inhibitors, lifestyle changes.",
    prevention: "Avoid alcohol, smoking, NSAIDs, and spicy foods.",
    food: {
      recommended: ["Boiled vegetables", "Oatmeal", "Yogurt"],
      avoid: ["Coffee", "Citrus fruits", "Fried foods"]
    }
  },
  "malaria": {
    name: "Malaria",
    description: "A mosquito-borne parasitic infection, common in tropical regions.",
    symptoms: ["Fever", "Chills", "Sweating", "Headache"],
    treatment: "Antimalarial drugs, hydration, supportive care.",
    prevention: "Mosquito nets, repellents, antimalarial prophylaxis.",
    food: {
      recommended: ["Oranges", "Porridge", "Coconut water"],
      avoid: ["Fatty foods", "Sugary drinks", "Caffeine"]
    }
  },
  "migraine": {
    name: "Migraine",
    description: "A neurological condition causing intense headaches, often with nausea and sensitivity to light.",
    symptoms: ["Throbbing headache", "Nausea", "Light/sound sensitivity"],
    treatment: "Pain relievers, rest in dark quiet room, preventive meds.",
    prevention: "Avoid triggers, maintain sleep routine.",
    food: {
      recommended: ["Magnesium-rich foods", "Water", "Herbal teas"],
      avoid: ["Caffeine", "Aged cheese", "Chocolate"]
    }
  },
  "pneumonia": {
    name: "Pneumonia",
    description: "Infection causing inflammation in the air sacs of one or both lungs.",
    symptoms: ["Cough", "Chest pain", "Fever", "Shortness of breath"],
    treatment: "Antibiotics, fever reducers, rest.",
    prevention: "Vaccination, hand hygiene, avoid smoking.",
    food: {
      recommended: ["Soups", "Warm water", "Fruits"],
      avoid: ["Cold drinks", "Processed meats", "Fried food"]
    }
  },
  "typhoid": {
    name: "Typhoid Fever",
    description: "Bacterial infection caused by Salmonella typhi, spread via contaminated food/water.",
    symptoms: ["Prolonged fever", "Abdominal pain", "Weakness", "Constipation or diarrhea"],
    treatment: "Antibiotics, hydration, rest.",
    prevention: "Vaccination, safe drinking water, sanitation.",
    food: {
      recommended: ["Boiled vegetables", "Rice gruel", "Bananas"],
      avoid: ["Raw vegetables", "Milk", "Spicy foods"]
    }
  }
};

export default diseaseInfo;
