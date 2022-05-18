import { all, fork, takeEvery, call, put } from "@redux-saga/core/effects";
import axios from "axios";


// Action type
import {
    LOGIN_REQUEST, LOGIN_RESPONSE, LOGIN_ERROR
} from "../../redux/reducer/LoginReducer";

const LoginAPI = async (payload) => {
    return await axios.post("http://localhost:3002/auth/Login", payload);
}

function* postLoginAPI({ payload }) {
    try {
        const { data } = yield call(LoginAPI, payload);
        console.log("로그인 사가 ");
        yield put({
            type: LOGIN_RESPONSE,
            payload: data,
        });

    } catch {
        yield put({
            type: LOGIN_ERROR,
            error: "Login API Error",
        });
    }
}

function* catchLoginAPI() {
    yield takeEvery(LOGIN_REQUEST, postLoginAPI);
}

export default function* postLoginAPISaga() {
    yield all([
        fork(catchLoginAPI),
    ]);
}