// module
import React, { useEffect, useCallback, useState, useMemo } from "react";
import axios from "axios";
import { Link, history, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// component
import RoomList from "./RoomList";
import SideProfile from "./SideProfile";
import SocketMenuComponent from "../Socket/SocketMenu";

// public
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./sideBar.css";

import sideBarButton from "./image/sideBarButton.png";
import hideSidebutton from "./image/hide-side-button.png";


const SideBar = ({ userData }) => {

  
  const [cookie, setCookie, removeCookie] = useCookies();
  const [isShow, setIsShow] = useState(false);
  let history = useNavigate();

  const LogoutHandler = (e) => {
    console.log("hi");
    removeCookie("access_token");
  }

  const changeIsShowBool = (e) => {
    if (e.target.className === "side-container" || e.target.className === "side-exit-icon" || e.target.className === "hide-side-button") {
      isShow ? setIsShow(false) : setIsShow(true);
    }
  }

  return (
    <>
      {
        isShow ? (
          <div className="side-container" onClick={changeIsShowBool}>
            <div className="  side">
              <div className="side-auth-button-box">
                {
                  cookie.access_token ? <>
                    <span onClick={LogoutHandler}>
                      로그아웃
                    </span>
                  </>
                    : <>
                      <span >
                        <Link to={"/auth/login"}>
                          로그인
                        </Link>
                      </span>
                      <span>
                        <Link to={"/auth/register"}>
                          회원가입
                        </Link>
                      </span>
                    </>
                }
              </div>
              <SideProfile user={userData} />
              <SocketMenuComponent />
              <RoomList />
              <img src={sideBarButton} className="side-exit-icon" />
            </div>
          </div >
        )
          : (
            <div className="hide-side-container">

              <button  >
                {/* <FontAwesomeIcon icon={faCircleArrowRight} size={"3x"}/> */}
                <img src={hideSidebutton} className="hide-side-button" onClick={changeIsShowBool} />

              </button>
            </div>
          )
      }
    </>
  );
};

export default SideBar;
