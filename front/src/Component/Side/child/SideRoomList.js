import React, { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { sideRoomListRequest } from "../../store/redux/reducer/RoomList.reducer";

// component
import ChattingBox from "../../Home/Chat/Chatting"

// public
import "./SideRoomList.css";
import { customSocket } from "../../Custom/socket.io.custom";

const CategoryList = () => {

  const [cookie, setCookie, removeCookie] = useCookies();

  const dispatch = useDispatch();

  const list = useSelector(state => state.RoomListReducer.sideRoomList);
  
  useEffect(() => {
    if (cookie.access_token) {
      // setList(customSocket("sendToServerRoomList", "sendToClientRoomList", null));
      dispatch(sideRoomListRequest());
    }
  }, [cookie]);



  return (

    <ul className="roomList-ul-box">
      {
        cookie.access_token ?
          list ? list.map(res => {
            return <li key={res.id}>
              <Link to={`/chat/${res.id}`} >
                {res.roomName}
              </Link>
            </li>
          }) : null
          : null
      }
    </ul>
  );
};

export default CategoryList;
