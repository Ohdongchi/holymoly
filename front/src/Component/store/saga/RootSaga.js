import { all, fork, takeLatest, call, put } from "@redux-saga/core/effects";
import postLoginAPISaga from "./child/LoginSaga";
import sendSocketSaga from "./child/SocketSendMessageSaga";
import userVerifySaga from "./child/UserVerifySaga";
import getInfoAPISaga from "./child/ChatRoomInfoSaga";
import RoomListAPISaga from "./child/RoomListSaga";

export default function* rootSaga() {
    yield all([
        fork(postLoginAPISaga),
        fork(sendSocketSaga),
        fork(userVerifySaga),
        fork(getInfoAPISaga),
        fork(RoomListAPISaga),
    ])
}