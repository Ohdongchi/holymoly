import React from "react";
import axios from "axios";



// component
import Login from "../Auth/Login/Login";
import ChattingBox from "./Chat/Chatting"
// public
import "./home.css";
import MainRoomList from "./RoomList/MainRoomList";

const Home = () => {
  
  return (
    <div className="home">
      <MainRoomList />
    </div>
  );
};

export default Home;
