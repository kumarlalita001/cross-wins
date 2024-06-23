import React, { useRef, useState } from "react";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../utils/firebase.config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const Register = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleRegister = (e) => {
    e.preventDefault();

    console.log(
      usernameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    );

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((res) => {
        const user = res.user;

        sendEmailVerification(user, {
          url: "http://localhost:5173/",
        }).then((res) => {
          toast
            .warn(" Verify email please check in mailBox 🔥", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            })
            .catch((err) => {
              toast.error(err.message + " 😔", {
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
            });
        });

        console.log("register", res.user);
      })
      .catch((err) => {
        toast.error(err.message + " 😔", {
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
      });
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="mb-4">
        <input
          ref={usernameRef}
          type="text"
          placeholder="Username*"
          className="w-full px-4 py-2 bg-inherit border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="mb-4">
        <input
          ref={emailRef}
          type="email"
          placeholder="Email*"
          className="w-full px-4 py-2 border bg-inherit rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="mb-4">
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password*"
          className="w-full px-4 py-2 border bg-inherit rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-green-500  text-gray-900 font-bold  rounded-md"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
