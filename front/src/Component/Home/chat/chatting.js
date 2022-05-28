import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

import { sendSocketMessageRequest } from "../../store/redux/reducer/SendMessage.reducer";
import { tokenVerify } from "../../store/redux/reducer/UserVerify.reducer";

import "./chat.css";
const ChattingBox = ({ value }) => {
    const [chatData, setChatData] = useState([]);
    const [chatText, setChatText] = useState("");
    const dispatch = useDispatch();

    const [cookie, setCookie, removeCookie] = useCookies();

    const paramsId = useParams().id;
    const params_roomName = useParams().roomName;
    console.log(paramsId);
    console.log(params_roomName);
    const user = useSelector(state => state.verifyReducer.payload);

    // 생각해봤을 때 유저당 한개의 소켓을 가지고 있어야,
    // 방을 만들어서 방에서 대화할 수 있는 틀을 만들 수 있지 않을까 싶다.
    // 그래서 socket.io 연결을 redux로 옮겨서 중앙 상태값으로 관리 해야할듯 싶다.
    //ws://localhost:3003/chat

    useEffect(() => {
        // user 정보 가져오기
        dispatch(tokenVerify(cookie.access_token));

        // 채팅방 입장 및 채팅목록
        let socket = io("http://localhost:3003/chat", {
            auth: {
                access_token: cookie.access_token,
            }
        });

        socket.emit("joinChatRoom", {
            roomId: paramsId
        })


    }, [paramsId]);


    const onChangeChatTextHandler = (e) => {
        setChatText(e.target.value)
    }

    const onSubmitHandler = (e) => {
        let socket = io("http://localhost:3003/chat", {
            auth: {
                access_token: cookie.access_token,
            }
        });

        if (chatText !== "") {
            socket.emit("sendToServer", {
                message: chatText,
                roomId: paramsId,
            });
            socket.disconnect();
        } else {
            alert("채팅을 입력하세요")
        }
        setChatText("");
    }
    return (
        <div className="chatting-container">
            <div className="chatting-infomation">
                <ul>
                    <li><label>채팅방 이름: </label>{params_roomName}</li>
                </ul>
            </div>

            <div className="chatting-room">
                {
                    chatData.map(res => (
                        <span>
                            {res.message}
                        </span>
                    ))
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