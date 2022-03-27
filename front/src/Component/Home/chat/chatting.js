import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { io } from "socket.io-client";

import "./chat.css";

const ChattingBox = ({ value }) => {
    const [chatData, setChatData] = useState([]);
    const [chatText, setChatText] = useState("");

    let socket = io("ws://localhost:3003/chat");
    
    const onChangeChatTextHandler = (e) => {
        setChatText(e.target.value)
    }

    function finishedSocketEmit(e) {
        console.log('finished emit');
        console.log(e);
    }

    const onSubmitHandler = (e) => {

        const req = {
            room: "room1",
            msg: "room1에 연결합니다 !",
            token: ""
        };
        socket.emit("test", req);
        alert("실행");
    }
    return (
        <div className="chatting-container">

            <div className="chatting-room">
                { }
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