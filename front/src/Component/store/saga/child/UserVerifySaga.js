import { all, fork, takeEvery, call, put } from "@redux-saga/core/effects";
import axios from "axios";
import { customAxios } from "../../../Custom/customAxios";

import { VERIFY_ERROR, VERIFY_REQUEST, VERIFY_RESPONSE } from "../../redux/reducer/UserVerify.reducer";

export const verifyAPI = async (token) => {

    return await customAxios.post("/auth/verify");
    // return await axios.post(process.env.REACT_APP_SERVER_ADDRESS + "/auth/verify", {}, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         "access_token": token
    //     }
    // });
}

function* postVerifyAPI({ payload }) {
    try {
        const { data } = yield call(verifyAPI, payload);
        yield put({
            type: VERIFY_RESPONSE,
            payload: data,
        })
    }
    catch {
        yield put({
            type: VERIFY_ERROR,
            error: "verify API Error",
        })
    }
}

function* catchVerifyAPI() {
    yield takeEvery(VERIFY_REQUEST, postVerifyAPI);
}

export default function* postVerifyAPISaga() {
    yield all([
        fork(catchVerifyAPI),
    ]);
}