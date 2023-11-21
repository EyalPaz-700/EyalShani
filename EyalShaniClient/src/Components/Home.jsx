import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Home() {
  const navigator = useNavigate();
  const logout = () => {
    localStorage.setItem("currentUser", "");
  };
  return (
    <>
      <nav>
        <NavLink onClick={logout} to="/login">
          Logout
        </NavLink>
        <NavLink> Posts </NavLink>
        <NavLink> Albums </NavLink>
        <NavLink> Todos </NavLink>
        <NavLink> Info </NavLink>
      </nav>
    </>
  );
}
