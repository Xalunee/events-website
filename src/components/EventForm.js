import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru"; // локализация языка
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import addDays from "date-fns/addDays";
import { registerEvent } from "../services/event.js";
import Modal from "react-bootstrap/Modal";
import { storage } from "../services/init.js";
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
registerLocale("ru", ru); // регистрация локали с необходимым именем

export default function EventForm(props) {
  const [imageUpload, setImageUpload] = useState(null);
  const uploadImage = (unicName) => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/${unicName}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      window.location.reload();
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const name = imageUpload !== null ? imageUpload.name : '';
    const unicName = `${name + v4()}`;
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      timezone: "UTC",
    };
    const formattedData = {
      ...data,
      date: date.toLocaleString("ru", options), // Перевод в строковое значение, для записи в базу данных и далее запись в хранилище
      dateNum: Date.parse(date),
      user: localStorage.token,
      members: [localStorage.token],
      imageId: unicName,
    };
    const dataOfRegistration = await registerEvent(formattedData);
    uploadImage(unicName);
    props.onHide();
    document.querySelector(".event-form").reset();
  };

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(addDays(new Date(), 1), 0), 9)
  );
  let date = startDate;
  const filterPassedTime = (time) => {
    const currentDate = setHours(setMinutes(addDays(new Date(), 1), 0), 8);
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <section className="d-flex justify-content-center text-center">
        <div
          className="event-block"
          style={{
            width: "450px",
            paddingLeft: "30px",
            paddingRight: "30px",
            paddingBottom: "30px",
          }}
        >
          <h2 style={{ fontSize: "2rem", marginTop: "10px" }}>
            Создать мероприятие
          </h2>
          <form
            className="d-flex flex-column justify-content-center event-form"
            style={{ rowGap: "24px", marginTop: "24px" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="inputName"
                {...register("name", {
                  required: true,
                  minLength: 6,
                  maxLength: 40,
                })}
                placeholder="Название мероприятия *"
              />
              <label htmlFor="inputName">Название мероприятия *</label>
              <div style={{ color: "red", textAlign: "left" }}>
                {errors.name?.type === "required" && "Это поле обязательное"}
                {errors.name?.type === "minLength" && "Минимум 6 символов"}
                {errors.name?.type === "maxLength" && "Максимум 25 символов"}
              </div>
            </div>
            <div className="form-floating">
              <textarea
                className="form-control"
                id="textarea"
                {...register("description", {
                  required: true,
                  minLength: 6,
                })}
                rows="3"
                style={{ height: "200px" }}
                placeholder="Описание мероприятия *"
              />
              <label htmlFor="textarea">Описание мероприятия *</label>
              <div style={{ color: "red", textAlign: "left" }}>
                {errors.description?.type === "required" &&
                  "Это поле обязательное"}
                {errors.description?.type === "minLength" && "Минимум 6 символов"}
              </div>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="inputPlace"
                {...register("place", {
                  required: true,
                  minLength: 3,
                  maxLength: 60,
                })}
                placeholder="Место мероприятия *"
              />
              <label htmlFor="inputPlace">Место мероприятия *</label>
              <div style={{ color: "red", textAlign: "left" }}>
                {errors.place?.type === "required" && "Это поле обязательное"}
                {errors.place?.type === "minLength" && "Минимум 3 символа"}
                {errors.place?.type === "maxLength" && "Максимум 30 символов"}
              </div>
            </div>
            <DatePicker
              locale="ru"
              className="event-date w-100"
              style={{ height: "58px" }}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showIcon
              id="datepicker"
              placeholderText="Дата и время мероприятия"
              showTimeSelect
              filterTime={filterPassedTime}
              minDate={addDays(new Date(), 1)}
              timeIntervals={10}
              dateFormat="d MMMM, yyyy г. h:mm"
            />
            <div class="input-group custom-file-button">
		          <label class="input-group-text" for="inputGroupFile">Выбирите файл</label>
		          <input type="file" class="form-control" id="inputGroupFile" onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }} placeholder="Type some text"></input>
	          </div>
            <button className="btn btn-dark">Создать</button>
          </form>
        </div>
      </section>
    </Modal>
  );
}
