import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Component
import Home from "./Home/Home";
import SideBar from "./Side/SideBar";

// Public
import "./App.css";
import "./Home/home.css";
import "./Side/sideBar.css";
import axios from "axios";

function App() {
  const [sideData, setSideData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const changeIsShowBool = (e) => {
    console.log(e.target);
    if (e.target.className === "side-container" || e.target.className === "side-exit-icon" || e.target.className === "hide-side-button")
      isShow ? setIsShow(false) : setIsShow(true);
  }

  // useEffect(() => {
  //   axios.get("http://localhost:3002/category");
  // }, []);

  return (
    <>
      <h2 className="main-header">Main</h2>
      <SideBar isShow={isShow} changeIsShowBool={changeIsShowBool} userData={userData} sideData={sideData} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
