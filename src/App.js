import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar.js";

import Create from "./pages/Create";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pageBody">
          <Create />
        </div>
      </Router>
    </div>
  );
}
