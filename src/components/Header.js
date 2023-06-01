import React from "react";
import { getUserFromLocalStorage, registerUser } from "../services/user.js";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const navigate = useNavigate();
  const user = getUserFromLocalStorage();
  const currentUsers = useSelector((state) => state.users.users);
  const currentUser = currentUsers.find(
    (user) => user.id === localStorage.token
  );
  const isAdmin = currentUser && currentUser.role === 'admin' ? true : false;
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
          />
          <h2
            className="align-self-center"
            style={{ fontSize: "26px", marginLeft: "15px" }}
            onClick={() => navigate("/")}
          >
            Электроклуб г. Салават
          </h2>
        </div>
        {isAdmin ? <NavLink to="/admin" className="link">Пользователи</NavLink> : ''}
        <div className="d-flex">
          <button
            style={{ background: 0, border: 0 }}
            onClick={() => navigate(user ? "/profile" : "/login")}
            color="inherit"
          >
            <span
              className="font-weight-bold"
              style={{ fontSize: "22px", fontWeight: "500" }}
            >
              {user ? user.surname + " " + user.firstname + " " + adminText : "Войти"}
            </span>
          </button>
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
