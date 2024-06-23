import React, { useEffect, useState } from "react";
import { app } from "./utils/firebase.config";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthLayout, ForgetPassword, Login, Register } from "./pages/Auth";
import { Home } from "./pages/Root";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // if user loggedIn but by mistakly refreshs the page to make it persist
  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      // set the user state as User
      setUser(JSON.parse(localStorage.getItem("user")));

      // navigat to home
      navigate("/home");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="text-lime-50">
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
