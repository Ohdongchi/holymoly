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
import { customSocket } from "../Custom/socket.io.custom";

const CategoryList = () => {

  const [cookie, setCookie, removeCookie] = useCookies();

  const dispatch = useDispatch();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (cookie.access_token) {
      // let socket = io(process.env.REACT_APP_WEBSOCKET_SERVER_ADDRESS + "/chat", {
      //   auth: {
      //     access_token: cookie.access_token,
      //   },
      //   autoConnect:false
      // });

      // socket.connect().emit("sendToServerRoomList");

      // socket.on("sendToClientRoomList", (res) => {
      //   console.log(res);
      //   setList(res);
      //   socket.disconnect();
      // });


      setList(customSocket("sendToServerRoomList", "sendToClientRoomList", null));

    }
  }, [cookie]);



  return (

    <ul className="roomList-ul-box">
      {
        cookie.access_token ?
          list.map(res => {
            return <li key={res.id}>
              <Link to={`/chat/${res.id}`} >
                {res.roomName}
              </Link>
            </li>
          })
          : null
      }
    </ul>
  );
};

export default CategoryList;
