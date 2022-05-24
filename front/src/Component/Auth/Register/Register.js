import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import dayjs from "dayjs";


// public
import "./Register.css";



const RegisterComponent = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
    nickname: "",
    birthDay: dayjs().format("YYYY-MM-DD"),
    profileImg: "https://via.placeholder.com/50",
  });

  const onChangeEmail = (e) => {
    setValue({
      ...value,
      email: e.target.value === undefined ? "" : e.target.value,
    });
  };
  const onChangePassword = (e) => {
    setValue({
      ...value,
      password: e.target.value === undefined ? "" : e.target.value,
    });
  };
  const onChangeNickName = (e) => {
    setValue({
      ...value,
      nickname: e.target.value === undefined ? "" : e.target.value
    })
  };
  const onChangeBirthDay = (e) => {
    console.log(e.target.value);
    setValue({
      ...value,
      birthDay: e.target.value === undefined ? "" : e.target.value
    })
  };
  const onChangeProfileImage = (e) => {
    console.log(e.target.value);
    setValue({
      ...value,
      profileImg: e.target.value === undefined ? "" : e.target.value
    })
  };

  //backend multer 작업하기
  const onSubmitHandler = () => {
    axios.post("http://localhost:3002/auth/register", value);
  };

  return (
    <div className="Register-container">
      <form onSubmit={onSubmitHandler} className="register-form">
        <div>
          <label htmlFor="Email">Email</label>
          <input type="email" id="Email" onChange={onChangeEmail} value={value.email} />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input type="password" id="Password" onChange={onChangePassword} autoComplete="on" value={value.password} />
        </div>
        <div>
          <label htmlFor="Nickname">Nickname</label>
          <input type="text" id="Nickname" onChange={onChangeNickName} value={value.nickname} />
        </div>
        <div>
          <label htmlFor="BirthDay">Birth day</label>
          <input type="date" id="BirthDay" onChange={onChangeBirthDay} value={value.birthDay} />
        </div>
        {/* <div>
          <label htmlFor="ProfileImageUrl">ProfileImageUrl</label>
          <input type="file" id="ProfileImageUrl" onChange={onChangeProfileImage} />
        </div> */}
        <div>
          <input type="submit" value="회원가입" />
        </div>
      </form>
    </div>
  );
};

export default RegisterComponent;
