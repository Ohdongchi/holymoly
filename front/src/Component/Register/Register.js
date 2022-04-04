import React from "react";
import axios from "axios";
import dayjs from "dayjs";
const RegisterComponent = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
    nickName: "",
    birthDay: dayjs().date(),
    profileImage: "https://via.placeholder.com/50",
  });

  const onChangeEmail = (e) =>
    setValue({
      email: e.target.value,
    });

  const onChangePassword = (e) =>
    setValue({
      password: e.target.value,
    });

  const onChangeNickName = (e) => setValue({
     nickName: e.target.value
  });
  const onChangeBirthDay = (e) => setValue({
     birthDay: e.target.value
  })
  const onChangeProfileImage = (e) => setValue({
    profileImage: e.target.value
  })

  const onSubmitHandler = () => {
    return;
  };

  return (
    <div className="Register-container">
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>Email</label>
          <input type="email" onChange={onChangeEmail} value={value.email}/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" onChange={onChangePassword} value={value.password}/>
        </div>
        <div>
          <label>Nickname</label>
          <input type="text" onChange={onChangeNickName} value={value.nickName}/>
        </div>
        <div>
          <label>Birth day</label>
          <input type="date" onChange={onChangeBirthDay} value={value.birthDay}/>
        </div>
        <div>
          <label>ProfileImageUrl</label>
          <input type="file" onChange={onChangeProfileImage} />
        </div>
        <div>
          <input type="submit" value="회원가입"/>
        </div>
      </form>
    </div>
  );
};

export default RegisterComponent;
