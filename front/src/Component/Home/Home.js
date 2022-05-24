import React from "react";
import axios from "axios";



// component
import Login from "../Auth/Login/Login";
import ChattingBox from "./chat/chatting"
// public
import "./home.css";

const Home = () => {
  const token = "";
  return (
    <div className="home">
      <div>
        <ChattingBox />
      </div>
      
    </div>
  );
};

export default Home;
