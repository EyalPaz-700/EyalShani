import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Navbar({ logout }) {
  return (
    <>
      <nav>
        <NavLink onClick={logout} to="/login">
          <div>Logout</div>
        </NavLink>
        <NavLink to="/posts">
          {" "}
          <div>Posts</div>{" "}
        </NavLink>
        <NavLink>
          {" "}
          <div>Albums</div>{" "}
        </NavLink>
        <NavLink to="/todos">
          {" "}
          <div>Todos</div>{" "}
        </NavLink>
        <NavLink>
          {" "}
          <div>Info </div>{" "}
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
