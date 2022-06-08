import { all, fork, takeEvery, call, put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import { useCookies } from "react-cookie";
import { io } from "socket.io-client";
import { apiCustomAxios } from "../../../Custom/customAxios";

import { SIDE_ROOM_LIST_ERROR, SIDE_ROOM_LIST_REQUEST, SIDE_ROOM_LIST_RESPONSE,
    MAIN_ROOM_LIST_ERROR, MAIN_ROOM_LIST_REQUEST, MAIN_ROOM_LIST_RESPONSE } from "../../redux/reducer/RoomList.reducer";

const sideRoomListAPI = async (e) => {
    const test = await apiCustomAxios.post("/SRL");
    return test.data;
}

const mainRoomListAPI = async (e) => {
    console.log("test");
    return await apiCustomAxios.post("/MRL");
}

function* requestSideRoomListAPI() {
    try {
        
        const payload = yield call(sideRoomListAPI, "");

        yield put({
            type: SIDE_ROOM_LIST_RESPONSE,
            payload
        })

    } catch (err) {
        yield put({
            type: SIDE_ROOM_LIST_ERROR,
            error: "RoomList api error",
        })
    }
}

function* requestMainRoomListAPI() {
    try {
        console.log("4");
        const { data } = yield call(mainRoomListAPI);

        yield put({
            type: MAIN_ROOM_LIST_RESPONSE,
            payload: data,
        });
    } catch (err) {
        yield put({
            type: MAIN_ROOM_LIST_ERROR,
            error: "Main Room List Saga error",
        });
    }
}

function* catchSideRoomListAPI() {
    yield takeLatest(SIDE_ROOM_LIST_REQUEST, requestSideRoomListAPI);
}

function* catchMainRoomListAPI() {
    console.log("hi! 33");
    yield takeLatest(MAIN_ROOM_LIST_REQUEST, requestMainRoomListAPI);
}

export default function* RoomListAPISaga() {
    yield all([
        fork(catchSideRoomListAPI),
        fork(catchMainRoomListAPI),
    ]);
}