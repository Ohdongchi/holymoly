import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import axios, { Axios } from "axios";

import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";

// Component
import Home from "./Home/Home";
import SideBar from "./Side/SideBar";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";


import ReactModal from "react-modal";
import ChattingBox from "./Home/Chat/Chatting"
import CustomModal from "./Custom/CustomModal";


// Public
import "./App.css";

function App() {
  const [userData, setUserData] = useState([]);

  const [cookie, setCookie, removeCookie] = useCookies(["access_token"]);

  const token = useSelector(state => state.LoginReducer.payload);
  const history = useNavigate();
  const location = useLocation();
  let historyState = location.state;
  
  useEffect(() => {
    if (token) {
      setCookie("access_token", token.access_token, {
        expires: new Date(token.expires),
        path: "/",
        httpOnly: false,
        secure: true,
      });
      document.location.reload();
    }
  }, [token]);

  return (
    <>
      <h2 className="main-header"><Link to="/">Main</Link></h2>
      <SideBar userData={userData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/chat">
          <Route path=":id" element={<ChattingBox />} />
        </Route>
        <Route path="*" element={<div>page not found </div>} />
      </Routes>
    </>
  );
}

export default App;
