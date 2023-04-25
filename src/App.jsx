import React from "react";
import Home from "./pages/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Carrinho from "./components/common/Carrinho";
import Finalizar from "./components/common/Finalizar";


const App = () => {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/finalizar" element={<Finalizar />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
