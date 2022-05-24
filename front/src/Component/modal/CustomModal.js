import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChatRoomIsOpenModalRequest } from "../store/redux/reducer/CreateChatRoom.reducer";

import reactModal from "react-modal";

import "./customModal.css";

const CustomModal = ({ history, children }) => {

  const isOpen = useSelector(state => state.createChatRoomModalReducer.isOpen);
  const dispatch = useDispatch();

  const modalController = (e) => {
    if (e.target.className === "custom-modal-container") {
      dispatch(createChatRoomIsOpenModalRequest())
    }
  }

  const modalControllerButton = (e) => {
    if (e.target.className === "line1") {
      dispatch(createChatRoomIsOpenModalRequest())
    }
  }

  return (
    <>
      {
        isOpen == true ? (
          <div className="custom-modal-container" onClick={modalController}>
            <div className="custom-modal-box">
              <div className="custom-modal-exit-button">
                <div className="line1" onClick={modalControllerButton}></div>
              </div>
              <div className="custom-modal-content">
                {children}
              </div>
            </div>
          </div>
        )
          : null
      }
    </>
  );
}

export default CustomModal;