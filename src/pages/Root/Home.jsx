import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase.config";

const Home = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    if (!user) navigate("/");
  }, []);
  const handleLogout = () => {
    // 1. remove user from local storage
    localStorage.removeItem("user");
    // 2. make the firebase auth sink
    signOut(auth);
    // 3. update the user state
    setUser(null);
    // 4. navigate to login
    navigate("/");
  };

  return (
    <div className="w-full h-screen bg-black">
      Home
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
