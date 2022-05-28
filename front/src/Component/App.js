import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";

import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
// Component
import Home from "./Home/Home";
import SideBar from "./Side/SideBar";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";


import ReactModal from "react-modal";
import ChattingBox from "./Home/chat/Chatting"
import CustomModal from "./modal/CustomModal";


// Public
import "./App.css";

function App({ history }) {
  const [userData, setUserData] = useState([]);

  const [cookie, setCookie, removeCookie] = useCookies(["access_token"]);

  const token = useSelector(state => state.LoginReducer.payload);

  // console.log(isOpen)

  useEffect(() => {
    if (token) {
      // console.log("app:", token);
      setCookie("access_token", token.access_token, {
        expires: new Date(token.expires),
        path: "*",
        httpOnly: false,
        secure: true,
      });
    }
  }, [token]);

  // useEffect(() => {
  //   axios.get("http://localhost:3002/category");
  // }, []);

  return (
    <>
      <h2 className="main-header"><Link to="/">Main</Link></h2>
      <SideBar userData={userData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/chat">
          <Route path=":id" >
            <Route path=":roomName" element={<ChattingBox />} />
          </Route>
        </Route>
        <Route path="*" element={<div>page not found </div>} />
      </Routes>
    </>
  );
}

export default App;
