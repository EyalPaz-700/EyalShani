import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Navbar({ logout }) {
  return (
    <>
      <nav>
        <NavLink
          onClick={logout}
          to="/login"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div>Logout</div>
        </NavLink>
        <NavLink
          to="/posts"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {" "}
          <div>Posts</div>{" "}
        </NavLink>
        <NavLink
          to="/Albums"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {" "}
          <div>Albums</div>{" "}
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/todos"
        >
          {" "}
          <div>Todos</div>{" "}
        </NavLink>
        <NavLink
          to="/info"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {" "}
          <div>Info </div>{" "}
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
