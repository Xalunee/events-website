import React from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../services/user.js";
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
    const dataOfRegistration = await registerUser({...data, role: "member" });
    console.log(dataOfRegistration)
    localStorage.token = dataOfRegistration.id;
    localStorage.firstname = dataOfRegistration.firstname;
    localStorage.surname = dataOfRegistration.surname;
    if (dataOfRegistration) {
      navigate("/");
    }
  };

  return (
    <section
      className="d-flex justify-content-center text-center"
      style={{ height: "100vh" }}
    >
      <div
        className="registration-form center-block align-self-center gap-3"
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
          Зарегистрироваться
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
            <label htmlFor="inputEmail">Электронная почта *</label>
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
            <label htmlFor="inputPassword">Пароль *</label>
            <div style={{ color: "red", textAlign: "left" }}>
              {errors.password?.type === "required" && "Это поле обязательное"}
              {errors.password?.type === "minLength" && "Минимум 6 символов"}
              {errors.password?.type === "maxLength" && "Максимум 15 символов"}
            </div>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="inputName"
              {...register("firstname", {
                required: true,
                minLength: 3,
                maxLength: 12,
              })}
              placeholder="Имя пользователя"
            />
            <label htmlFor="inputName">Имя *</label>
            <div style={{ color: "red", textAlign: "left" }}>
              {errors.firstname?.type === "required" && "Это поле обязательное"}
              {errors.firstname?.type === "minLength" && "Минимум 3 символа"}
              {errors.firstname?.type === "maxLength" && "Максимум 12 символов"}
            </div>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="inputSurname"
              {...register("surname", {
                required: true,
                minLength: 3,
                maxLength: 12,
              })}
              placeholder="Фамилия пользователя"
            />
            <label htmlFor="inputSurname">Фамилия *</label>
            <div style={{ color: "red", textAlign: "left" }}>
              {errors.surname?.type === "required" && "Это поле обязательное"}
              {errors.surname?.type === "minLength" && "Минимум 3 символа"}
              {errors.surname?.type === "maxLength" && "Максимум 12 символов"}
            </div>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="inputPatronymic"
              {...register("patronymic", {
                required: true,
                minLength: 3,
                maxLength: 20,
              })}
              placeholder="Отчество"
            />
            <label htmlFor="inputPatronymic">Отчество *</label>
            <div style={{ color: "red", textAlign: "left" }}>
              {errors.patronymic?.type === "required" &&
                "Это поле обязательное"}
              {errors.patronymic?.type === "minLength" && "Минимум 3 символа"}
              {errors.patronymic?.type === "maxLength" &&
                "Максимум 20 символов"}
            </div>
          </div>
          <button className="btn btn-dark">Зарегистрироваться</button>
          <span style={{ fontSize: "1rem", marginTop: "-10px" }}>
            У меня уже есть аккаунт <Link to="/login">Войти</Link>
          </span>
        </form>
      </div>
    </section>
  );
}
