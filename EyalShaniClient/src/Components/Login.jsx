import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
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
      let data = await fetch("http://localhost:3000/users");
      data = await data.json();
      const user = returnUser(data, form.username);
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

  const returnUser = (users, username) => {
    for (const user of users) {
      if (user.username === username) {
        return user;
      }
    }
    return;
  };

  const setActiveUser = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
  };
  return (
    <>
      <h1 id="login-header"> Login </h1>
      <form>
        <label>
          <h3> username </h3>
          <input name="username" type="text" onInput={changeFormInput} />
        </label>
        <label>
          <h3> password </h3>
          <input type="password" onInput={changeFormInput} name="password" />
        </label>
        <input onClick={onSubmit} type="button" value="Submit" />
      </form>
      <div className="error-msgs">{errMsg}</div>
    </>
  );
}
