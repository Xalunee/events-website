import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru"; // the locale you want
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import addDays from "date-fns/addDays";
import { changeEvent } from "../services/event.js";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
registerLocale("ru", ru); // register it with the name you want

export default function ModalEdit(props) {
  const { event } = props;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: event.name,
      description: event.description,
      place: event.place
    }
  });

  const onSubmit = async (data) => {
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
      id: props.event.id,
      date: date.toLocaleString("ru", options), // Перевод в строковое значение, для записи в базу данных и далее запись в хранилище
      dateNum: Date.parse(date),
      user: props.event.user,
      members: props.event.members,
    };
    const dataOfRegistration = await changeEvent(formattedData);
    props.onHide();
    document.querySelector(".event-form").reset();
  };

  const [startDate, setStartDate] = useState(props.event.dateNum);
  let chosenDate = startDate
  ? startDate
  : event.dateNum;
  if (typeof chosenDate === "number") {
    const formattedDate = new Date(chosenDate);
    chosenDate = formattedDate;
  }
  let date = chosenDate;
  const filterPassedTime = (time) => {
    const currentDate = addDays(new Date(), 1);
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  useEffect(() => {
    setValue("name", event.name);
    setValue("description", event.description);
    setValue("place", event.place);
    setStartDate(props.event.dateNum);
  }, [event]);

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
            Редактирование мероприятия
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
                placeholder="Название мероприятия *"
                {...register("name", {
                  required: true,
                  minLength: 6,
                  maxLength: 15,
                })}
              />
              <label htmlFor="inputName">Название мероприятия *</label>
              <div style={{ color: "red", textAlign: "left" }}>
                {errors.name?.type === "required" && "Это поле обязательное"}
                {errors.name?.type === "minLength" && "Минимум 3 символа"}
                {errors.name?.type === "maxLength" && "Максимум 15 символов"}
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
                {errors.description?.type === "minLength" &&
                  "Минимум 6 символов"}
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
              selected={chosenDate}
              onChange={(date) => setStartDate(date)}
              showIcon
              id="datepicker"
              placeholderText="Дата и время мероприятия"
              showTimeSelect
              //filterTime={filterPassedTime}
              minDate={addDays(new Date(), -7)}
              timeIntervals={1}
              dateFormat="d MMMM, yyyy г. h:mm"
            />
            <button className="btn btn-dark">Сохранить изменения</button>
          </form>
        </div>
      </section>
    </Modal>
  );
}
