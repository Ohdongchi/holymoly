import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";


// reducer
import { sendSocketMessageRequest } from "../../store/redux/reducer/SendMessage.reducer";
import { tokenVerify } from "../../store/redux/reducer/UserVerify.reducer";
import { requestPersonel } from "../../store/redux/reducer/RoomPersonle.reducer";

// public
import "./chat.css";

// component
import CustomModal from "../../Custom/CustomModal";
import { customSocket, sleep } from "../../Custom/socket.io.custom";
import { getCookie } from "../../Custom/customAxios";


let socket = io(process.env.REACT_APP_WEBSOCKET_SERVER_ADDRESS + "/chat", {
    auth: {
        access_token: getCookie("access_token")
    },
    autoConnect: false,
    reconnectionDelayMax: 5000,
});


const ChattingBox = ({ value }) => {
    const [chatData, setChatData] = useState([]);
    const [chatText, setChatText] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [path, setPath] = useState("");

    const [cookie, setCookie, removeCookie] = useCookies();

    const dispatch = useDispatch();
    const history = useNavigate();
    const paramRoomId = useParams().id;
    const location = useLocation();
    const user = useSelector(state => state.VerifyReducer.payload);
    const roomInfo = useSelector(state => state.RoomPersonelReducer.payload);


    useEffect(() => {
        if (!cookie.access_token) {
            history("/");
        }
    }, [cookie]);

    useEffect(() => {
        // user 정보 가져오기
        dispatch(tokenVerify(cookie.access_token));
        // user 구성원 목록 및 채팅방 정보 가져오기
        dispatch(requestPersonel(paramRoomId));

        socket.connect().emit("joinChatRoom", { roomId: paramRoomId });
        socket.connect().emit("getChatLog", { roomId: paramRoomId });
    }, [paramRoomId]);

    useEffect(() => {
        socket.connect().on("joinedRoom", ({ userId, nickname, message, roomId, join }) => {
            if (roomId == paramRoomId) {
                setChatData(prev => [...prev, { userId, nickname, message, join }]);
            }
        });
        socket.connect().on('sendToClientMessage', ({ userId, nickname, message, roomId }) => {
            if (roomId == paramRoomId)
                setChatData(prev => [...prev, { userId, nickname, message }]);
        });

        socket.connect().on("exitedChatRoom", (res) => {
            setChatData(prev => [...prev, res]);
        });

        socket.connect().on("getChatLogList", (res) => {
            setChatData(chatData.concat(res.reverse()));
        })
        
    }, []);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (chatText !== "") {
            socket.connect().emit("sendToServerMessage", {
                message: chatText,
                roomId: paramRoomId
            });
        } else {
            alert("채팅을 입력하세요")
        }
        setChatText("");
    }

    const onChangeChatTextHandler = (e) => {
        setChatText(e.target.value)
    }

    const onModal = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true);
    }

    const exitChatRoom = (e) => {
        socket.connect().emit("exitChatRoom", {
            roomId: paramRoomId,
        });

        history("/");
        document.location.reload();
    }

    useEffect(() => {
    }, [chatData]);


    return (
        <div className="chat">
            <div className="chatting-container">
                <CustomModal isOpen={isOpen} isOpenController={onModal}>

                    <div className="chatting-personel">
                        <table>
                            <thead>
                                <th colSpan={3}>
                                    유저목록
                                </th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Nickname</td>
                                    <td>Email</td>
                                    <td>본인 여부</td>
                                </tr>
                                {
                                    roomInfo ? roomInfo.roomPersonel.map((res, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{res.nickname}</td>
                                                <td>{res.email}</td>
                                            </tr>
                                        );
                                    }) : null
                                }
                            </tbody>
                        </table>
                    </div>
                </CustomModal>
                <div className="chatting-box">
                    <div className="chatting-infomation">
                        <ul>
                            <li><label>채팅방 이름: {roomInfo ? roomInfo.roomName : ""}</label></li>
                            <li onClick={onModal}><input type="button" value="구성원" /></li>
                            <li onClick={exitChatRoom}><input type="button" value="채팅방 나기기" /></li>
                        </ul>
                        <div className="chatting-infomation-hashTag">
                            {
                                roomInfo ? roomInfo.hashTag.map((res, index) => {
                                    return <Link to={`/hashtag/search/${res}`} key={index}>{`#${res}`}</Link>
                                }) : null
                            }
                        </div>
                    </div>
                    <div className="chatting-window">
                        {
                            chatData ?
                                chatData.map((res, index) => {
                                    return (
                                        <>
                                            {
                                                res.join ?
                                                    <div key={index} className="chat-center">
                                                        <div key={index}>{res.message}</div>
                                                    </div>
                                                    : res.userId == user.id ?
                                                        <div key={index} className="chat-right">
                                                            <div key={index}>{res.nickname}</div>
                                                            <div key={index}>{res.message}</div>
                                                        </div>
                                                        : <div key={index} className="chat-left">
                                                            <div key={index}>{res.nickname}</div>
                                                            <div key={index}>{res.message}</div>
                                                        </div>

                                            }
                                        </>
                                    );
                                })
                                : null
                        }
                    </div>
                </div>
                <div className="chatting-panel-box">
                    <form onSubmit={onSubmitHandler}>
                        <input type="text" className="chatting-text" onChange={onChangeChatTextHandler} value={chatText} />
                        <input type="submit" className="chatting-submit" value="전송" />
                    </form>
                </div>
            </div>

        </div>
    )
}

export default ChattingBox;