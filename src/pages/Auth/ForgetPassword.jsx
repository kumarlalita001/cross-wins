import React, { useRef } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../utils/firebase.config";
import { Bounce, ToastContainer, toast } from "react-toastify";

const ForgetPassword = () => {
  const emailRef = useRef();

  const handleResetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, emailRef.current.value, {
      url: "https://cross-wins.web.app",
    })
      .then(() => {
        toast.success("Password reset email sent! 📧", {
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
      })
      .catch((error) => {
        toast.error(error.message + " 😔", {
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
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-slate-950">
      <div className="bg-slate-900 p-8 rounded-lg shadow-lg max-w-md w-full ml-2 mr-2">
        <h2 className="text-2xl font-bold mb-2 text-center">Reset Password</h2>
        <p className="text-gray-200 mb-8 text-center">
          Enter your email to receive password reset instructions
        </p>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <input
              ref={emailRef}
              type="email"
              placeholder="Email*"
              className="w-full bg-inherit px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-gray-900 font-bold rounded-md"
          >
            Send Reset Email
          </button>
        </form>
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

export default ForgetPassword;
