import { all, fork, takeEvery, call, put } from "@redux-saga/core/effects";
import axios from "axios";
import { useCookies } from "react-cookie";
import { io } from "socket.io-client";

import { RoomList_ERROR, RoomList_REQUEST, RoomList_RESPONSE } from "../../redux/reducer/RoomList.reducer";


function* requestRoomListAPI({token}) {
    try {
        let socket = io("http://localhost:3003/chat", {
            auth: {
                access_token: token,
            }
        });
        socket.emit("getAllChatRoomList");

        yield put({
            type: RoomList_RESPONSE,
        })

    } catch (err) {
        yield put({
            type: RoomList_ERROR,
            error: "RoomList api error",
        })
    }
}

function* catchRoomListAPI() {
    yield takeEvery(RoomList_REQUEST, requestRoomListAPI);
}

export default function* requestRoomListAPISaga() {
    yield all([
        fork(catchRoomListAPI),
    ]);
}