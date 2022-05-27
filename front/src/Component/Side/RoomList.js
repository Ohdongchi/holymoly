import React, { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { RoomListRequest } from "../store/redux/reducer/RoomList.reducer";

// component
import ChattingBox from "../Home/chat/Chatting"

// public
import "./RoomList.css";

const CategoryList = () => {

  const [cookie, setCookie, removeCookie] = useCookies();

  const dispatch = useDispatch();
  const [list, setList] = useState([]);


  useEffect(() => {
    if (cookie.access_token) {
      let socket = io("http://localhost:3003/chat", {
        auth: {
          access_token: cookie.access_token,
        }
      });
      socket.emit("CgetAllChatRoomList");

      socket.on("SgetChatRoomList", (res) => {
        setList(res);
      })
    }
  }, [cookie]);



  return (

    <ul className="roomList-ul-box">
      {
        list.map(res => {
          return <li key={res.id}>
            <Link to={`/chat/${res.id}`} >
              {res.roomName}
            </Link>
          </li>
        })
      }
    </ul>
  );
};

export default CategoryList;
