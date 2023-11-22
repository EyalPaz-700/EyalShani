import Todos from "./Components/Todos";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import { useState } from "react";
import Posts from "./Components/Posts";
import Navbar from "./Components/Navbar";
import Post from "./Components/Post";

function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  const logout = () => {
    setCurrentUser("");
    localStorage.setItem("currentUser", "");
  };

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? (
                <Home ogout={logout} />
              ) : (
                <Login setActiveUser={login} />
              )
            }
          />
          <Route path="/Login" element={<Login setActiveUser={login} />} />
          <Route path="/Signup" element={<Signup setActiveUser={login} />} />
          <Route element={<Navbar />}>
            <Route path="/Home" element={<Home logout={logout} />} />
            <Route path="/posts">
              <Route index element={<Posts currentUser={currentUser} />} />
              <Route path=":id" element={<Post currentUser={currentUser} />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
