import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/forms.css";
export default function Login({ setActiveUser }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const changeFormInput = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async () => {
    try {
      let data = await fetch(
        `http://localhost:3000/users/?username=${form.username}`
      );
      data = await data.json();
      const user = data[0];
      if (user) {
        if (user.password === form.password) {
          setErrMsg("");
          setActiveUser(user);
          navigate("/Home");
        } else {
          setErrMsg("bad password");
        }
      } else {
        setErrMsg("user does not exist");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 id="login-header"> Login </h1>
      <form id="login">
        <label>
          <h3> Username </h3>
          <input
            placeholder="shir123"
            name="username"
            type="text"
            onInput={changeFormInput}
          />
        </label>
        <label>
          <h3> Password </h3>
          <input
            placeholder="MyPassword123"
            type="password"
            onInput={changeFormInput}
            name="password"
          />
        </label>
        <input onClick={onSubmit} type="button" value="Submit" />
      </form>
      {errMsg && <div className="error-msgs">{errMsg}</div>}
    </>
  );
}
