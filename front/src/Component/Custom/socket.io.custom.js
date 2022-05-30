import { faL } from "@fortawesome/free-solid-svg-icons";
import { io } from "socket.io-client";
import { getCookie } from "./customAxios";


var state = undefined;

export const customUseState = (initState) => {
    if (state === undefined) {
        state = initState;
    }

    const setState = (newState) => {
        state = newState;
    }

    return [state, setState];
}


export const customSocket = (evServer, evClient, data) => {
    // console.log(getCookie("access_token"));
    const [result, setResult] = customUseState([]);

    let socket = io(process.env.REACT_APP_WEBSOCKET_SERVER_ADDRESS + "/chat", {
        auth: {
            access_token: getCookie("access_token")
        },
        autoConnect: false
    });

    // 같은 소켓으로 통신 해야한다.
    socket.connect().emit(evServer, data ? { data } : undefined);
    
    socket.connect().on(evClient, (res) => {
        setResult(res);
        socket.disconnect();
    });

    console.log("result", result);
    return result;

}