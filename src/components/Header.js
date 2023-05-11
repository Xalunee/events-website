import React from "react";
import { useForm } from "react-hook-form";
import { getUserFromLocalStorage, registerUser } from "../services/user.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const user = getUserFromLocalStorage();

  return (
    <header
      className="border-bottom border-dark"
      style={{ padding: "13px 29px", background: "#F9F9F9" }}
    >
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-nowrap">
          <img
            style={{ width: "54px" }}
            src={require("../assets/logo-main.png")}
          />
          <h2
            className="align-self-center"
            style={{ fontSize: "26px", marginLeft: "15px" }}
            onClick={() => navigate("/")}
          >
            Электроклуб г. Салават
          </h2>
        </div>
        <button
          style={{ background: 0, border: 0 }}
          onClick={() => navigate(user ? "/profile" : "/login")}
          color="inherit"
        >
          <span
            className="font-weight-bold"
            style={{ fontSize: "22px", fontWeight: "bold" }}
          >
            {user ? user.firstname + " " + user.surname : "Войти"}
          </span>
        </button>
      </div>
    </header>
  );
}
