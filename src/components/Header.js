import React from "react";
import { getUserFromLocalStorage } from "../services/user.js";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const navigate = useNavigate();
  const user = getUserFromLocalStorage();
  const currentUsers = useSelector((state) => state.users.users);
  const currentUser = currentUsers.find(
    (user) => user.id === localStorage.token
  );
  const isAdmin = currentUser && currentUser.role === "admin" ? true : false;
  const adminText = isAdmin ? "(Админ)" : "";

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
            alt="Иконка"
          />
          <NavLink
            to="/"
            className="link align-self-center"
            style={{
              fontSize: "26px",
              marginLeft: "15px",
              marginBottom: "4px",
            }}
          >
            Электроклуб г. Салават
          </NavLink>
        </div>
        {isAdmin ? (
          <NavLink to="/admin" className="link">
            Пользователи
          </NavLink>
        ) : (
          ""
        )}
        <div className="d-flex">
          <NavLink
            to={user ? "/profile" : "/login"}
            className="link"
            style={{ background: 0, border: 0, marginBottom: "4px" }}
            onClick={() => navigate(user ? "/profile" : "/login")}
            color="inherit"
          >
            <span
              className="font-weight-bold"
              style={{ fontSize: "22px", fontWeight: "500" }}
            >
              {user
                ? user.surname + " " + user.firstname + " " + adminText
                : "Войти"}
            </span>
          </NavLink>
          {user ? (
            <button
              style={{
                background: 0,
                border: 0,
                fontSize: "22px",
                fontWeight: "bold",
                marginLeft: "20px",
              }}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              color="inherit"
            >
              Выйти
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
}
