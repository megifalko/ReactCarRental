import React from "react";
import { FaCarAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authReducer";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="flex-col flex-j-center flex-a-center flex-ac-center m-0 full-height">
      <div className="modal-container bg-white flex-col flex-j-center flex-ac-center flex-a-center w-400 h-400 border-radius-75 p-30 pl-10 pr-10">
      <FaCarAlt className="car-icon mb-20"/>
        <input
          className="login w-300 h-40 border-radius-75 pl-20 s-14 mb-5"
          type="text"
          placeholder="username"
        />
        <input
          className="login w-300 h-40 border-radius-75 pl-20 s-14 mt-5"
          type="email"
          placeholder="email address"
        />
        <input
          className="login w-300 h-40 border-radius-75 pl-20 s-14 mt-5"
          type="password"
          placeholder="password"
        />
        <input
          className="login w-300 h-40 border-radius-75 pl-20 s-14 mt-5"
          type="number"
          placeholder="age"
        />
        <input
          className="login w-300 h-40 border-radius-75 pl-20 s-14 mt-5"
          type="number"
          placeholder="years of having driving license"
        />
        <input
          className="login w-300 h-40 border-radius-75 pl-20 s-14 mt-5"
          type="text"
          placeholder="location"
        />
        <div className="flex-col flex-j-end mt-70">
          <button
            className="modal-button-rent bg-c2 w-220 h-50 border-radius-75 s-28 text-center font-weight-700 color-white no-border mb-5"
            onClick={() => {
              dispatch(login("asd"));
              navigate("../home");
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
