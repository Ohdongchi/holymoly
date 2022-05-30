import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChatRoomIsOpenModalRequest } from "../store/redux/reducer/CreateChatRoom.reducer";

import reactModal from "react-modal";

import "./customModal.css";

const CustomModal = ({ history, children, isOpen, isOpenController }) => {


  const dispatch = useDispatch();

  const modalController = (e) => {
    if (e.target.className === "custom-modal-container") {
      isOpenController();
    }
  }

  const modalControllerButton = (e) => {
    if (e.target.className === "line1") {
      isOpenController();
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