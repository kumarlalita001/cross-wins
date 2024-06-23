import React from "react";
import { app } from "./utils/firebase.config";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthLayout, ForgetPassword, Login, Register } from "./pages/Auth";

const App = () => {
  // console.log(app);

  return (
    <div className="text-lime-50">
      <Router>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="forget-password" element={<ForgetPassword />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
