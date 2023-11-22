import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setActiveUser }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    verifyPassword: "",
  });
  const passwordRegex = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");

  const changeFormInput = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async () => {
    if (form.username.length < 6) {
      setErrMsg("Length Needs to be more than 5");
    } else if (!passwordRegex.test(form.password)) {
      setErrMsg(
        "Password Needs To Be Minimum eight characters, at least one letter and one number"
      );
    } else if (form.password !== form.verifyPassword) {
      setErrMsg("password do not match");
    } else {
      try {
        let data = await fetch("http://localhost:3000/users");
        data = await data.json();
        const user = returnUser(data, form.username);
        if (user) {
          setErrMsg("user already exists");
        } else {
          const reponse = await addNewUser(data.length + 1);
          if (reponse) {
            setActiveUser(user);
            navigate("/Home");
          } else {
            setErrMsg("User Creation Failed");
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const addNewUser = async (id) => {
    try {
      let response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          name: form.name,
          username: form.username,
          email: "",
          phone: "",
          password: form.password,
        }),
      });
      return await response.json();
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
  return (
    <>
      <h1 id="signup-header"> Signup </h1>
      <form id="signup">
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
        <label>
          <h3> Confirm Password </h3>
          <input
            placeholder="MyPassword123"
            type="password"
            onInput={changeFormInput}
            name="verifyPassword"
          />
        </label>
        <input onClick={onSubmit} type="button" value="Submit" />
      </form>
      {errMsg && <div className="error-msgs">{errMsg}</div>}
    </>
  );
}
