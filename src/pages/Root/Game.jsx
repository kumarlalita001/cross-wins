import React, { useContext, useEffect, useState } from "react";
import { onValue, ref, remove, set } from "firebase/database";
import { db } from "../../utils/firebase.config";
import { AuthContext } from "../../context/AuthContext";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TicTacToe = () => {
  const { roomId } = useContext(AuthContext);
  const { XorO } = useContext(AuthContext);

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const navigate = useNavigate();

  const setListener = () => {
    const gameRef = ref(db, "board" + roomId);
    onValue(gameRef, (snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        const newBoard = JSON.parse(snapshot.val());
        setBoard(newBoard);
      } else {
        // console.log("board not found");
      }
    });

    const turnRef = ref(db, "turn" + roomId);
    onValue(turnRef, (snapshot) => {
      if (snapshot.exists()) {
        //console.log(snapshot.val());
        const newTurn = JSON.parse(snapshot.val());
        setIsXNext(newTurn);
      } else {
        // const newTurnRef = ref(db, "turn" + "1234");
        // set(newTurnRef, JSON.stringify(!isXNext));
        // console.log("turn not found");
      }
    });

    const winnerRef = ref(db, "winner" + roomId);
    onValue(winnerRef, (snapshot) => {
      if (snapshot.exists()) {
        //console.log(snapshot.val());
        const newWinner = JSON.parse(snapshot.val());
        setWinner(newWinner);
      } else {
        // console.log("win not found");
      }
    });
  };

  useEffect(() => {
    setListener();
  }, []);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const newTurnRef = ref(db, "turn" + roomId);
    set(newTurnRef, JSON.stringify(!isXNext));

    const newWinnerRef = ref(db, "winner" + roomId);
    set(newWinnerRef, JSON.stringify(winner));

    const newBoardRef = ref(db, "board" + roomId);
    set(newBoardRef, JSON.stringify(newBoard));

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      const newWinnerRef = ref(db, "winner" + roomId);
      set(newWinnerRef, JSON.stringify(!winner ? gameWinner : ""));
    }
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    remove(ref(db, "board" + roomId));
    remove(ref(db, "turn" + roomId));
    remove(ref(db, "winner" + roomId));
  };

  const handleToRoom = () => {
    handleRestart();
    navigate("/room");
  };

  return (
    <div className="flex flex-col justify-center items-center relative">
      {!winner && (
        <div className="text-2xl w-full  font-bold opacity-60 text-purple-50 mb-6 text-center justify-between items-center flex  md:flex-row gap-6 ">
          <h2 className="font-mono px-2 py-1   bg-blue-500 rounded-md">
            RoomId {roomId}
          </h2>
          <h2 className="font-mono px-2 py-1  bg-indigo-400 rounded-md">
            Turn {isXNext ? " X" : "O"}
          </h2>
          <h2 className="font-mono px-2 py-1  bg-teal-500 rounded-md">
            YourTurn {isXNext == (XorO == "X") ? "Yes" : "No"}
          </h2>
        </div>
      )}
      {winner == null ? (
        <div className="md:w-[30%] grid grid-cols-3 gap-4 ">
          {board.map((value, index) => (
            <div
              key={index}
              className="cell w-14 h-14 shadow-sm shadow-orange-50   bg-slate-800 text-white flex items-center justify-center cursor-pointer"
              onClick={() => {
                isXNext == (XorO == "X")
                  ? handleClick(index)
                  : toast.warn(" Wait for your turn 🔥", {
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
              }}
            >
              {value}
            </div>
          ))}
        </div>
      ) : (
        <div className="md:w-[30%] grid grid-cols-3 gap-4 ">
          {board.map((_, index) => (
            <div
              key={index}
              className="cell w-14 h-14 animate-bounce bg-slate-800 text-white flex items-center justify-center cursor-wait"
            ></div>
          ))}
        </div>
      )}
      {winner && (
        <div className="text-3xl md:text-6xl font-extrabold animate-bounce  absolute top-[15%] mt-4 text-center text-green-500">
          Winner : {winner}
        </div>
      )}
      <button
        onClick={handleRestart}
        className="mt-4 mb-4 py-2 px-4 bg-green-500 hover:bg-green-700 text-gray-900 font-bold rounded-md"
      >
        Restart Game
      </button>
      <button
        onClick={handleToRoom}
        className="max-w-3xl w-full py-2  rounded-md  text-black hover:text-white font-bold bg-cyan-600 hover:bg-cyan-800 border border-blue-900"
      >
        Create New Room
      </button>

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

export default TicTacToe;
