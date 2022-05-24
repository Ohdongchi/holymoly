import { all, fork, takeEvery, call, put } from "@redux-saga/core/effects";
import axios from "axios";

// Action type
import {
    MESSAGE_REQUEST,
    MESSAGE_RESPONSE,
    MESSAGE_ERROR
} from "../../redux/reducer/SendMessage.reducer";
import { io } from "socket.io-client";
import { useCookies } from "react-cookie";

const SendMessageAPI = (req) => {

    let socket = io("ws://localhost:3003/chat"); 
    const data = {
        roomName: "room2",
        personel: 50,
        hashTag: [
            "trip"
        ]
    }
    socket.emit("createChatRoom", data);
    return 
}

function* sendSocketMessage(req) {
    try {
        const { data } = yield call(SendMessageAPI, req);

        yield put({
            type: MESSAGE_RESPONSE,
            payload: data,
        });
    } catch {
        yield put({
            type: MESSAGE_ERROR,
            error: "send socket message error",
        });
    }
}

function* catchSendSocket() {
    yield takeEvery(MESSAGE_REQUEST, sendSocketMessage);
}

export default function* sendSocketSaga() {
    yield all([
        fork(catchSendSocket),
    ]);
}