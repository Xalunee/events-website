import React from "react";
import { useForm } from "react-hook-form";
import { getUserFromDB, loginUser } from "../services/user.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Form() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const dataOfLogin = await loginUser(data);
    localStorage.token = dataOfLogin.id;
    const dataOfUser = await getUserFromDB();
    localStorage.firstname = dataOfUser.firstname;
    localStorage.surname = dataOfUser.surname;
    if (dataOfLogin) {
      navigate("/");
    }
  };

  return (
    <section
      className="d-flex justify-content-center text-center"
      style={{ height: "100vh" }}
    >
      <div
        className="login-form center-block align-self-center gap-3"
        style={{
          width: "396px",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <img
          style={{ width: "45px" }}
          src={require("../assets/logo-lock.PNG")}
        />
        <h2 style={{ fontSize: "2rem", marginTop: "10px" }}>
          Авторизоваться
        </h2>
        <form
          className="d-flex flex-column justify-content-center"
          style={{ rowGap: "24px", marginTop: "24px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              {...register("email", {
                required: "required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Неправильный электронный адрес",
                },
              })}
              placeholder="Электронная почта"
            />
            <label htmlFor="inputEmail">Электронная почта</label>
            <div style={{ color: "red", textAlign: "left" }}>
              {errors.email?.type === "required" && "Это поле обязательное"}
              {errors.email?.type === "pattern" && errors.email?.message}
            </div>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 15,
              })}
              placeholder="Пароль"
            />
            <label htmlFor="inputPassword">Пароль</label>
            <div style={{ color: "red", textAlign: "left" }}>
              {errors.password?.type === "required" && "Это поле обязательное"}
              {errors.password?.type === "minLength" && "Минимум 6 символов"}
              {errors.password?.type === "maxLength" && "Максимум 15 символов"}
            </div>
          </div>
          <button className="btn btn-dark">Авторизоваться</button>
          <span style={{ fontSize: "1rem", marginTop: "-10px" }}>
            У меня ещё нет аккаунта <Link to="/register">Зарегистрироваться</Link>
          </span>
        </form>
      </div>
    </section>
  );
}
