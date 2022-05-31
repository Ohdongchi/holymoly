import React, { useState, useCallback, useMemo, useEffect, useRef, useLayoutEffect } from "react";
import axios from "axios";

import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../store/redux/reducer/Login.reducer";
import { useNavigate } from "react-router-dom";

// public
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie, removeCookie] = useCookies(["access_token"]);
  const [saveChecked, setSaveChecked] = useState(false);
  let history = useNavigate();

  const token = useSelector(state => state.LoginReducer.payload);
  // httpOnly = css(cross site scripting) 공격 막힘
  // secure = true --> https만 토큰을 받을 수 있다.
  useEffect(() => {
    const saveLoginEmail = window.localStorage.getItem("login_email");
    if (saveLoginEmail) {
      setEmail(saveLoginEmail);
      setSaveChecked(true);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const submitObject = {
      email,
      password: `${password}`,
    };
    dispatch(loginRequest(submitObject));
    
    history("/");
    return false;
  };

  const onChangeEmail = (e) => {
    if (saveChecked) {
      window.localStorage.setItem("login_email", email);
    }
    return setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    return setPassword(e.target.value);
  };

  const saveEmail = (e) => {
    if (saveChecked) {
      setSaveChecked(false);
    } else {
      window.localStorage.setItem("login_email", email);
      setSaveChecked(true);
    }
  }

  const changePasswordType = (e) => {
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
          <div className="email-box division">
            <input type="email" id={"email"} onChange={onChangeEmail} />
            <input type="checkbox" checked={saveChecked} onChange={saveEmail} />
          </div>

          <label htmlFor={"password"}>Password</label>
          <div className="password-box division">
            <input
              type="password"
              id={"password"}
              onChange={onChangePassword}
              required
              autoComplete="on"
            />
            <input type="checkbox" onChange={changePasswordType} />
          </div>
          <input type="submit" value="Login" />
        </form>
      </div>
    </>
  );
};

export default Login;
