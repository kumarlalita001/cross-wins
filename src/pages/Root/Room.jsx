import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const Room = () => {
  const [roomCode, setRoomCode] = useState("");
  const [playerSymbol, setPlayerSymbol] = useState("");
  const navigate = useNavigate();

  const randomNumberGen = () => {
    return Math.floor(Math.random() * 99999);
  };

  const { setRoomId } = useContext(AuthContext);
  const { setXorO } = useContext(AuthContext);
  // const handleCreateRoom = () => {
  //   const newRoomCode = Math.random().toString(36).substring(2, 8);
  //   // Simulate room creation
  //   toast.success(`Room created with code: ${newRoomCode}`, {
  //     position: "top-center",
  //     autoClose: 2000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "dark",
  //     transition: Bounce,
  //   });
  //   // navigate(`/room/${newRoomCode}`);
  // };

  const handleJoinRoom = () => {
    if (!playerSymbol) {
      toast.error("Please choose playerSymbol", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    if (roomCode.trim() === "") {
      toast.error("Please enter a valid room code", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    setRoomId(roomCode);
    setXorO(playerSymbol);

    //navigate(`/room/${roomCode}`);
    navigate(`/home`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-slate-950 p-4">
      <div className="bg-slate-900 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Join or Create a Room
        </h2>
        <div className="flex flex-col space-y-4">
          {/* <button
            onClick={handleCreateRoom}
            className="py-2 px-4 bg-green-500 text-white rounded-md"
          >
            Create New Room
          </button> */}
          {/* <div className="relative">
            <input
              required
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder="choose X or O"
              className="w-full bg-inherit px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleJoinRoom}
              className="absolute right-0 top-0 h-full py-2 px-4 bg-blue-500 text-white rounded-r-md"
            >
              Join Room
            </button>

          </div> */}

          <select
            value={playerSymbol}
            onChange={(e) => setPlayerSymbol(e.target.value)}
            className="w-full bg-inherit px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
          >
            <option value="" disabled className="text-gray-400 bg-[#16171c]">
              Select playerSymbol*
            </option>
            <option className="text-black" value="X">
              X
            </option>
            <option className="text-black" value="O">
              O
            </option>
          </select>
          <div className="relative">
            <input
              required
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder=" eg: 523421 "
              className="w-full bg-inherit px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleJoinRoom}
              className="absolute right-0 top-0 h-full py-2 px-4 bg-blue-500 text-white rounded-r-md"
            >
              Join Room
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};

export default Room;
