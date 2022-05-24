import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";

import ReactModal from "react-modal";

import "./SocketMenu.css";
import CustomModal from "../modal/CustomModal";
import { createChatRoomIsOpenModalRequest } from "../store/redux/reducer/CreateChatRoom.reducer";

const SocketMenuComponent = () => {

  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies();
  const [formData, setFormData] = useState({
    roomName: "",
    personel: 0,
    hashTag: [],
  });
  const hashTagRef = useRef();
  const isOpen = useSelector(state => state.createChatRoomModalReducer.isOpen);

  useEffect(() => {
    setFormData({
      roomName: "",
      personel: 0,
      hashTag: [],
    })
  }, [isOpen])

  //ws://localhost:3003/chat

  const createRoomClickHandler = (e) => {
    dispatch(createChatRoomIsOpenModalRequest());
  }

  const onChangeRoomName = (e) => setFormData({
    ...formData,
    roomName: e.target.value
  });

  const onChangePersonel = (e) => setFormData({
    ...formData,
    personel: Number(e.target.value),
  });

  const addHashTag = (e) => {
    if (hashTagRef.current.value !== undefined && hashTagRef.current.value !== "") {
      setFormData({
        ...formData,
        hashTag: formData.hashTag.concat(hashTagRef.current.value),
      });
      hashTagRef.current.value = "";
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let socket = io.connect("http://localhost:3003/chat", {
      auth: {
        access_token: cookie.access_token,
      }
    });
    socket.emit("createChatRoom", formData);
    setFormData({
      roomName: "",
      personel: 0,
      hashTag: [],
    });
    dispatch(createChatRoomIsOpenModalRequest());
  }

  return (
    <>
      {
        cookie.access_token ?
          < div className="side-socket-menu-container" >
            <ul>
              <li className="create-chatting-room" onClick={createRoomClickHandler}>
                채팅방 만들기
              </li>
            </ul>
            <CustomModal>
              <div className="modal-content-container">
                <h2>채팅방 만들기</h2>
                <form className="modal-content-comtainer-form" onSubmit={onSubmitHandler}>
                  <div>
                    <label htmlFor="roomName">채팅방 이름</label>
                    <input type="text" id="roomName" placeholder="채팅방 이름을 적어주세요." onChange={onChangeRoomName} />
                  </div>
                  <div>
                    <label htmlFor="roomName">정원 수</label>
                    <input type="text" id="roomName" placeholder="정원 수" onChange={onChangePersonel} />
                  </div>
                  <div>
                    <label htmlFor="roomName">해시태그</label>
                    <div>
                      <input type="text" id="roomName" placeholder="해시태그" ref={hashTagRef} />
                      <input type="button" className="hashTag-button" value="추가" onClick={addHashTag} />
                    </div>
                  </div>
                  <div className="hashTag-list">
                    {
                      formData.hashTag.map(tag => {
                        return <span>#{tag}</span>
                      })
                    }
                  </div>
                  <div>
                    <input type={"submit"} value="만들기 !" />
                    {/* <input type="button" value="다 지우기" /> */}
                  </div>
                </form>
              </div>
            </CustomModal>
          </div >
          : null
      }
    </>
  )
}

export default SocketMenuComponent;