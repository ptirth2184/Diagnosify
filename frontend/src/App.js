import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SymptomChecker from "./pages/SymptomChecker"; // To build or link
import Chatbot from "./pages/Chatbot";
import DiseaseInfo from './pages/DiseaseInfo';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/predict" element={<SymptomChecker />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/info/:disease" element={<DiseaseInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
