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
    console.log('state', state);
    return [state, setState];
}

export const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

let result;
export const customSocket = async (evServer, evClient, data) => {
    // console.log(getCookie("access_token"));
    // const [result, setResult] = customUseState([]);

    let socket = io(process.env.REACT_APP_WEBSOCKET_SERVER_ADDRESS + "/chat", {
        auth: {
            access_token: getCookie("access_token")
        },
        autoConnect: true
    });

    socket.emit(evServer, data);
    // if (evClient !== undefined && evClient !== "") {
    //     console.log(evClient);

    //     await sleep(2000)
    //     socket.on(evClient, async (res) => {
    //         console.log(res);
    //         // setResult(res);
    //         result = res;
    //         console.log(result, "result afte");
    //         return socket.disconnect();
    //     });
    //     await sleep(2000)

    //     console.log("끝?");
    // } else {
    //     socket.disconnect();
    // }
    // if (!result) {
    //     console.log("없음?");
    //     return { message: "ok" };
    // }
    return result;
}