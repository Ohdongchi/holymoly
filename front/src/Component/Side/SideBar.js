// module
import React, { useEffect, useCallback, useState, useMemo } from "react";
import axios from "axios";
import { Link, history } from "react-router-dom";

// component
import CategoryList from "./categoryList";
import SideProfile from "./SideProfile";
import { useCookies } from "react-cookie";


// public
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

import sideBarButton from "./image/sideBarButton.png";
import hideSidebutton from "./image/hide-side-button.png";


const SideBar = ({ isShow, changeIsShowBool, userData, sideData, history }) => {

  const [cookie, setCookie, removeCookie] = useCookies();

  const LogoutHandler = (e) => {
    console.log(history);
    removeCookie("access_token");
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
              <CategoryList data={sideData} />
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
