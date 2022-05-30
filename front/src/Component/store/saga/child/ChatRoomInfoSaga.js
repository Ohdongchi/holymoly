import { all, fork, takeEvery, call, put } from "@redux-saga/core/effects";
import axios from "axios";
import customAxios from "../../../Custom/customAxios";

import {
    CHAT_ROOM_INFO_ERROR, CHAT_ROOM_INFO_REQUEST, CHAT_ROOM_INFO_RESPONSE
} from "../../redux/reducer/ChatRoomInfo.reducer";

const infoAPI = async ({ roomId, access_token }) => {
    return await customAxios.post("/info", {roomId});
}

function* getInfoAPI({ payload }) {
    try {
        const { data } = yield call(infoAPI, payload);
        yield put({
            type: CHAT_ROOM_INFO_RESPONSE,
            payload: data,
        })
    } catch {
        yield put({
            type: CHAT_ROOM_INFO_ERROR,
            error: "info api error"
        })
    }
}

function* catchInfoAPI() {
    yield takeEvery(CHAT_ROOM_INFO_REQUEST, getInfoAPI);
}

export default function* getInfoAPISaga() {
    yield all([
        fork(catchInfoAPI),
    ])
}
