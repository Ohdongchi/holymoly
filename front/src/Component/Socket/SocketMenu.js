import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";

import ReactModal from "react-modal";

import "./SocketMenu.css";
import CustomModal from "../Custom/CustomModal";
import { createChatRoomIsOpenModalRequest } from "../store/redux/reducer/CreateChatRoomModal.reducer";

const SocketMenuComponent = () => {

  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies();
  const [formData, setFormData] = useState({
    roomName: "",
    personel: 0,
    hashTag: [],
  });
  const hashTagRef = useRef();
  const isOpen = useSelector(state => state.CreateChatRoomModalReducer.isOpen);

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
    let reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
    if (hashTagRef.current.value !== undefined && hashTagRef.current.value !== "") {
      const hashtags = hashTagRef.current.value.trim().replace(reg, " ").split(" ");

      setFormData({
        ...formData,
        hashTag: formData.hashTag.concat([...new Set(hashtags)]),
      });
      hashTagRef.current.value = "";
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let socket = io("http://localhost:3003/chat", {
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

  const onModal = () => {
    dispatch(createChatRoomIsOpenModalRequest())
  }

  return (
    <>
      {
        cookie.access_token ?
          < div className="side-socket-menu-container" >
            <ul>
              <li className="create-chatting-room" onClick={createRoomClickHandler}>
                ????????? ?????????
              </li>
            </ul>
            <CustomModal isOpen={isOpen} isOpenController={onModal}>
              <div className="modal-content-container">
                <h2>????????? ?????????</h2>
                <form className="modal-content-comtainer-form" onSubmit={onSubmitHandler}>
                  <div>
                    <label htmlFor="roomName">????????? ??????</label>
                    <input type="text" id="roomName" placeholder="????????? ????????? ???????????????." onChange={onChangeRoomName} />
                  </div>
                  <div>
                    <label htmlFor="roomName">?????? ???</label>
                    <input type="number" id="roomName" placeholder="?????? ???" onChange={onChangePersonel} />
                  </div>
                  <div>
                    <label htmlFor="roomName">????????????</label>
                    <div>
                      <input type="text" id="roomName" placeholder="????????????" ref={hashTagRef} />
                      <input type="button" className="hashTag-button" value="??????" onClick={addHashTag} />
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
                    <input type={"submit"} value="????????? !" />
                    {/* <input type="button" value="??? ?????????" /> */}
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