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
    <header className="header">
      <div className="links d-flex">
        <NavLink to="/" className="link website-name">
          Электроклуб г. Салават
        </NavLink>
        {isAdmin ? (
          <NavLink to="/admin" className="link link-users">
            Пользователи
          </NavLink>
        ) : (
          ""
        )}
        <div className="d-flex links-end">
          <NavLink
            to={user ? "/profile" : "/login"}
            className="link"
            onClick={() => navigate(user ? "/profile" : "/login")}
            color="inherit"
            style={!user ? {color: "#7c7c7c"} : ""}
          >
            <span className="font-weight-bold">
              {user
                ? user.surname + " " + user.firstname + " " + adminText
                : "Войти"}
            </span>
          </NavLink>
          {user ? (
            <button
              className="btn-exit"
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
