import { all, fork, takeLatest, call, put } from "@redux-saga/core/effects";
import postLoginAPISaga from "./child/LoginSaga";
import sendSocketSaga from "./child/SocketSendMessageSaga";
import requestRoomListAPISaga from "./child/RoomListSaga";
import userVerifySaga from "./child/UserVerifySaga";

export default function* rootSaga() {
    yield all([
        fork(postLoginAPISaga),
        fork(requestRoomListAPISaga),
        fork(sendSocketSaga),
        fork(userVerifySaga),
    ])
}