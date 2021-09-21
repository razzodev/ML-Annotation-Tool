import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Logs from "./components/Logs/Logs.js";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar.js";
import DetectForm from "./components/DetectForm/DetectForm.js";
import Create from "./pages/Create";
import ManageFormsPage from "./pages/ManageFormsPage";
import AddUsers from "./components/AddUsers/AddUsers.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
import { isLoggedInAdmin, isLoggedInRegular } from "./components/Auth.js";

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
