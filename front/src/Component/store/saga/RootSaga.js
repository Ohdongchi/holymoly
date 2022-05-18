import { all, fork, takeLatest, call, put } from "@redux-saga/core/effects";
import postLoginAPISaga from "./child/LoginSaga";
import sendSocketSaga from "./child/SocketSendMessageSaga";

export default function* rootSaga() {
    yield all([
        fork(sendSocketSaga),
        fork(postLoginAPISaga)
    ])
}