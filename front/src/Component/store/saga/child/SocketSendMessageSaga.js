import { all, fork, takeEvery, call, put } from "@redux-saga/core/effects";
import axios from "axios";

// Action type
import {
    MESSAGE_REQUEST,
    MESSAGE_RESPONSE,
    MESSAGE_ERROR
} from "../../redux/reducer/SendMessageReducer";
import { io } from "socket.io-client";

const SendMessageAPI = (payload) => {
    console.log("saga asdasdas", payload);
    let socket = io("ws://localhost:3003/chat");
    socket.emit("createChatRoom", payload);
    // socket.on("")
    return
}

function* sendSocketMessage({ payload }) {
    try {
        const { data } = yield call(SendMessageAPI, payload);
        console.log(`saga {payload: ${payload}, data: ${data}}`);
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