import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";

import { sendSocketMessageRequest } from "../../store/redux/reducer/SendMessageReducer";
import "./chat.css";

const ChattingBox = ({ value }) => {
    const [chatData, setChatData] = useState([]);
    const [chatText, setChatText] = useState("");
    const dispatch = useDispatch();

    
    const onChangeChatTextHandler = (e) => {
        setChatText(e.target.value)
    }

    function finishedSocketEmit(e) {
    }

    const onSubmitHandler = (e) => {
        let socket = io("ws://localhost:3003/chat");

        const data = {
            roomName: "room1",
            personel: 30,
        };
        // dispatch(sendSocketMessageRequest(data));
        socket.emit("createChatRoom", data);
        alert("실행");
    }
    return (
        <div className="chatting-container">

            <div className="chatting-room">
                {

                }
            </div>
            <div className="chatting-panel-box">
                <form onSubmit={onSubmitHandler}>
                    <input type="text" className="chatting-text" onChange={onChangeChatTextHandler} />
                    <input type="submit" className="chatting-submit" value="전송" />
                </form>
            </div>
        </div>
    )
}

export default ChattingBox;