import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

// Component
import Home from "./Home/Home";
import SideBar from "./Side/SideBar";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";

// Public
import "./App.css";
import "./Home/home.css";
import "./Side/sideBar.css";
import "./Auth/Register/Register.css";

function App() {
  const [sideData, setSideData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const changeIsShowBool = (e) => {
    if (e.target.className === "side-container" || e.target.className === "side-exit-icon" || e.target.className === "hide-side-button") {
      isShow ? setIsShow(false) : setIsShow(true);
    }
  }

  // useEffect(() => {
  //   axios.get("http://localhost:3002/category");
  // }, []);

  return (
    <>
      <h2 className="main-header">Main</h2>
      <SideBar isShow={isShow} changeIsShowBool={changeIsShowBool} userData={userData} sideData={sideData} />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/auth/login" exact element={<Login />} />
        <Route path="/auth/register" exact element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
