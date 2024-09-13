// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InfoPage from "./InfoPage";
import Quiz from "./Quiz";
import Results from "./Results";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { GlobalProvider } from "./components/GlobalState";

const App = () => {
  return (
    <Router>
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
      </GlobalProvider>
    </Router>
  );
};

export default App;
