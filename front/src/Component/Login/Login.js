import React, { useState, useCallback, useMemo, useEffect } from "react";
import axios from "axios";

// public
import "./Login.css";

import { useCookies } from "react-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const onSubmit = async () => {
    const submitObject = {
      email: email,
      password: password,
    };

    const token = await axios.post(
      "http://localhost:3002/auth/Login",
      submitObject
    );
    setCookie("token", token.data.access_token, {
      expires: token.data.expires,
      path: "/",
      httpOnly: true,
      secure: false,
    });
    // httpOnly = css(cross site scripting) 공격 막힘
    // secure = true --> https만 토큰을 받을 수 있다.
    return true;
  };

  const onChangeEmail = (e) => {
    return setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    return setEmail(e.target.value);
  };

  const changeInputType = (e) => {
    return e.target.previousElementSibling.type === "password" ?
    e.target.previousElementSibling.type = "text" :
    e.target.previousElementSibling.type = "password";
  }

  return (
    <>
      <div className="Login-container">
        <form className="Login-form" onSubmit={onSubmit}>
          <h3>Login</h3>
          <label htmlFor={"email"}>Email</label>
          <input type="email" id={"email"} onChange={onChangeEmail} />
          <label htmlFor={"password"}>Password</label>
          <div className="password-division">
            <input
              type="password"
              id={"password"}
              onChange={onChangePassword}
              required
            />
            <input type="checkbox" onChange={changeInputType}/>
          </div>
          <input type="submit" value="Login" />
        </form>
      </div>
    </>
  );
};

export default Login;
