import axios from "axios";

export const getCookie = (name) => {
    let cookie = new Object();
    let docCookie = document.cookie.split("=");
    for (let i = 0; i < docCookie.length; i += 2) {
        let key = docCookie[i];
        let value = docCookie[i + 1];
        cookie[key] = value
    }
    // console.log("getCookie",cookie[name]);
    return cookie[name];
}


const customAxios = axios.create({

    baseURL: process.env.REACT_APP_API_SERVER_ADDRESS,
    headers: {
        "access_token": getCookie("access_token"),
        "Content-Type": "Application/json"
    },

})


export default customAxios;