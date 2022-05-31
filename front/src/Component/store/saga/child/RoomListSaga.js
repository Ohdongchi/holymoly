import { all, fork, takeEvery, call, put } from "@redux-saga/core/effects";
import axios from "axios";
import { useCookies } from "react-cookie";
import { io } from "socket.io-client";
import { apiCustomAxios } from "../../../Custom/customAxios";

import { ROOM_LIST_ERROR, ROOM_LIST_REQUEST, ROOM_LIST_RESPONSE } from "../../redux/reducer/RoomList.reducer";

const roomListAPI = async (e) => {
    const test = await apiCustomAxios.post("/roomList");
    return test.data;
}

function* requestRoomListAPI() {
    try {
        const payload = yield call(roomListAPI, "");

        yield put({
            type: ROOM_LIST_RESPONSE,
            payload
        })

    } catch (err) {
        yield put({
            type: ROOM_LIST_ERROR,
            error: "RoomList api error",
        })
    }
}

function* catchRoomListAPI() {
    yield takeEvery(ROOM_LIST_REQUEST, requestRoomListAPI);
}

export default function* RoomListAPISaga() {
    yield all([
        fork(catchRoomListAPI),
    ]);
}