import { all, fork, takeLatest, call, put } from "@redux-saga/core/effects";
import sendSocketSaga from "./child/SocketSendMessageSaga";

export default function* rootSaga() {
    yield all([
        fork(sendSocketSaga)
    ])
}