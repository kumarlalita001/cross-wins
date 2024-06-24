import React, { useEffect, useState } from "react";
import { app } from "./utils/firebase.config";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthLayout, ForgetPassword, Login, Register } from "./pages/Auth";
import { Home, Room } from "./pages/Root";
import { AuthContext } from "./context/AuthContext";
import NotFound from "./components/PageNotFound";
import Offline from "./components/Offline";

const App = () => {
  const [roomId, setRoomId] = useState(null);
  const [user, setUser] = useState(null);
  const [XorO, setXorO] = useState(null);

  const navigate = useNavigate();

  // if user loggedIn but by mistakly refreshs the page to make it persist

  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      // set the user state as User
      setUser(JSON.parse(localStorage.getItem("user")));
      navigate("/room");
      // navigat to home
    }
  }, []);

  useEffect(() => {
    const handleOffline = () => {
      navigate("/offline");
    };

    const handleOnline = () => {
      navigate(-1); // Navigate back to the previous page if online
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, roomId, setRoomId, XorO, setXorO }}
    >
      <div className="text-lime-50">
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="home" element={<Home />} />
          <Route path="room" element={<Room />} />
          <Route path="/offline" element={<Offline />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
