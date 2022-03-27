import React from "react";
import axios from "axios";



// component
import Login from "../Login/Login";
import ChattingBox from "./chat/chatting"
// public
import "./home.css";

const Home = () => {
  const token = "asdadasdwadzxvcgrwfa";
  return (
    <div className="home">
      {token === "" ? <Login /> :
        <div>
          <ChattingBox />
        </div>
      }
    </div>
  );
};

export default Home;
