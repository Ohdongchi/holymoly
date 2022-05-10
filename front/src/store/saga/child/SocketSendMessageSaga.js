import { all, fork, takeEvery, call, put } from "@redux-saga/core/effects";
import axios from "axios";

import {
    MESSAGE_REQUEST,
    MESSAGE_RESPONSE,
    MESSAGE_ERROR
} from "../../redux/SendMessageReducer";


const SendMessageAPI = (payload) => {
    return await axios.post(`ws://localhost:3003/chat`, payload);
}

function* sendSocketMessage({ payload }) {
    try {
        const { data } = yield call(SendMessageAPI, payload);
        yield put({
            type: MESSAGE_REQUEST,
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