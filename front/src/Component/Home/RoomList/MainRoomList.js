import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { mainRoomListRequest } from "../../store/redux/reducer/RoomList.reducer";


import "./MainRoomList.css";

const MainRoomList = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const data = useSelector(state => state.RoomListReducer.mainRoomList);
    const [cookie, setCookie, removeCookie] = useCookies();

    console.log(data);
    useEffect(() => {
        if (cookie.access_token)
            dispatch(mainRoomListRequest());
    }, []);

    return (
        <div className="mainRoomList-container">
            <div className="mainRoomList-gridBox">
                {
                    data ? data.map((res, index) => {
                        return (
                            <Link to={`/chat/${res.id}`} className="girdBox-element">
                                <h4> 이름: {res.roomName} </h4>
                                <span> 정원: {res.personel}명 </span>
                                <span> 만든사람: {res.roomMember.length < 1 ? null : res.roomMember[0].user.nickname} </span>
                                <span> 생성일: {res.createdAt.split("T")[0]} </span>
                            </Link>
                        )
                    })
                        : (<div> 로그인하세요. </div>)

                }
            </div>
        </div>
    )

}

export default MainRoomList;