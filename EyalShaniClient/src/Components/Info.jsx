import React, { useState } from "react";
import "../style/forms.css";
export default function Info({ setActiveUser, currentUser }) {
  const [form, setForm] = useState({
    ...currentUser,
  });
  const changeFormInput = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [errMsg, setErrMsg] = useState("");
  const passwordRegex = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleSubmit = async () => {
    if (!passwordRegex.test(form.password)) {
      setErrMsg(
        "Password Needs To Be Minimum eight characters, at least one letter and one number"
      );
    } else {
      try {
        debugger;
        let response = await fetch(
          `http://localhost:3000/users/${currentUser.id}`,
          {
            method: "PATCH",
            body: JSON.stringify(form),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        response = await response.json();
        setActiveUser(response);
        setErrMsg("User Updated Succesfuly");
        if (!response) {
          setErrMsg("User Updating Failed");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <h1 id="my-profile-header"> My Profile</h1>
      <form id="info">
        <label>
          <h3> Username </h3>
          <input value={form.username} readOnly name="username" type="text" />
        </label>
        <label>
          <h3> Email </h3>
          <input value={form.email} name="username" type="text" readOnly />
        </label>
        <label>
          <h3> Name </h3>
          <input
            value={form.name}
            name="name"
            type="text"
            onInput={changeFormInput}
          />
        </label>
        <label>
          <h3> Password </h3>
          <input
            value={form.password}
            name="password"
            type="password"
            onInput={changeFormInput}
          />
        </label>
        <label>
          <h3> Phone </h3>
          <input
            value={form.phone}
            name="phone"
            type="text"
            onInput={changeFormInput}
          />
        </label>
        <input type="button" value="Submit" onClick={handleSubmit} />
      </form>
      {errMsg && <div className="error-msgs">{errMsg}</div>}
    </>
  );
}
