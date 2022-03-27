import React, { useEffect, useCallback, useState, useMemo } from "react";
import axios from "axios";
import CategoryList from "./categoryList";
import SideProfile from "./SideProfile";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

import sideBarButton from "./image/sideBarButton.png";
import hideSidebutton from "./image/hide-side-button.png";

const SideBar = ({ isShow, changeIsShowBool, userData, sideData }) => {
  return (
    <>
      {
        isShow ? (
          <div className="side-container" onClick={changeIsShowBool}>
            <div className="side">
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
