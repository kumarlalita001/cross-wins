import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase.config";
import TicTacToe from "./Game";

const Home = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-slate-950 p-4">
      <button
        onClick={handleLogout}
        className="max-w-3xl w-full rounded-md py-2 font-bold bg-slate-950 border border-blue-900 hover:bg-slate-900"
      >
        Logout
      </button>

      <div className="bg-slate-900 p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Welcome to the Game Zone
        </h2>
        <p className="text-gray-200 mb-8 text-center">
          Enjoy playing Tic-Tac-Toe!
        </p>

        <TicTacToe />
      </div>
    </div>
  );
};

export default Home;
