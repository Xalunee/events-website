import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { subscribeToEvent } from "../services/event.js";
import { removeEvent } from "../services/event.js";
import { changeEvent } from "../services/event.js";
import ModalEdit from "./ModalEdit.js";

const AdminEvents = () => {
  const [currentEvent, setCurrentEvent] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const dateNow = new Date();
  const allEvents = useSelector((state) => state.events.events);
  const currentUsers = useSelector((state) => state.users.users);
  const eventType = localStorage.eventType ? localStorage.eventType : "Текущие";
  const localDateRange = localStorage.dateRange
    ? localStorage.dateRange.split(",")
    : null;
  const dateRange = localStorage.dateRange
    ? [Number(localDateRange[0]), Number(localDateRange[1])]
    : null;
  return (
    <>
      {eventType === "Текущие"
        ? allEvents.map((event) => {
            // Если указан диапазон дат, то отображаются текущие мероприятия
            if (
              dateRange &&
              event.dateNum > dateRange[0] &&
              event.dateNum < dateRange[1]
            ) {
              return (
                <div className="event d-flex" key={event.id}>
                  <div className="left-section">
                    <div className="event-header">
                      <h3>{event.name}</h3>
                    </div>
                    <p className="event-date">
                      Дата и время:{" "}
                      <span style={{ fontWeight: "400" }}>{event.date}</span>
                    </p>
                    <p className="event-place">
                      Место:{" "}
                      <span style={{ fontWeight: "400" }}>{event.place}</span>
                    </p>
                    <p className="event-organizer">
                      Организатор:
                      <span style={{ fontWeight: "400" }}>
                        {" "}
                        {
                          currentUsers.find((user) => user.id === event.user)
                            .surname
                        }{" "}
                        {
                          currentUsers.find((user) => user.id === event.user)
                            .firstname
                        }{" "}
                        {
                          currentUsers.find((user) => user.id === event.user)
                            .patronymic
                        }
                      </span>
                    </p>
                  </div>
                  <div className="right-section">
                    <div className="event-description">
                      <pre>{event.description}</pre>
                    </div>
                    <div className="btns-section" id="block">
                      {localStorage.token &&
                      event.members.includes(localStorage.token) ? (
                        <button
                          type="button"
                          className="btn-subscribe btn btn-outline-danger"
                          onClick={() => {
                            const copyMembers = [...event.members];
                            const userIndex = copyMembers.indexOf(
                              localStorage.token
                            );
                            copyMembers.splice(userIndex, userIndex);
                            changeEvent({ ...event, members: copyMembers });
                          }}
                        >
                          Я не пойду
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn-subscribe btn btn-outline-success"
                          onClick={() => {
                            const copyMembers = [...event.members];
                            copyMembers.push(localStorage.token);
                            changeEvent({ ...event, members: copyMembers });
                          }}
                        >
                          Я пойду
                        </button>
                      )}
                      <div className="btns-section">
                        <button
                          type="button"
                          className="btn-edit btn btn-outline-dark"
                          onClick={() => {
                            setModalShow(true);
                            setCurrentEvent(event);
                          }}
                        >
                          Редактировать
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-block ml-3"
                          onClick={() => {
                            removeEvent(event);
                          }}
                          style={
                            event.dateNum < Date.parse(dateNow)
                              ? { width: "517px" }
                              : { width: "48%" }
                          }
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                    <span className="event-members">
                      Пойдут на мероприятие: {event.members.length}
                    </span>
                  </div>
                </div>
              );
            }

            // Если не указан диапазон дат, то выводятся текущие мероприятия
            if (!dateRange && event.dateNum > Date.parse(dateNow)) {
              return (
                <div className="event d-flex" key={event.id}>
                  <div className="left-section">
                    <div className="event-header">
                      <h3>{event.name}</h3>
                    </div>
                    <p className="event-date">
                      Дата и время:{" "}
                      <span style={{ fontWeight: "400" }}>{event.date}</span>
                    </p>
                    <p className="event-place">
                      Место:{" "}
                      <span style={{ fontWeight: "400" }}>{event.place}</span>
                    </p>
                    <p className="event-organizer">
                      Организатор:
                      <span style={{ fontWeight: "400" }}>
                        {" "}
                        {
                          currentUsers.find((user) => user.id === event.user)
                            .surname
                        }{" "}
                        {
                          currentUsers.find((user) => user.id === event.user)
                            .firstname
                        }{" "}
                        {
                          currentUsers.find((user) => user.id === event.user)
                            .patronymic
                        }
                      </span>
                    </p>
                  </div>
                  <div className="right-section">
                    <div className="event-description">
                      <pre>{event.description}</pre>
                    </div>
                    <div className="btns-section" id="block">
                      {localStorage.token &&
                      event.members.includes(localStorage.token) ? (
                        <button
                          type="button"
                          className="btn-subscribe btn btn-outline-danger"
                          onClick={() => {
                            const copyMembers = [...event.members];
                            const userIndex = copyMembers.indexOf(
                              localStorage.token
                            );
                            copyMembers.splice(userIndex, userIndex);
                            changeEvent({ ...event, members: copyMembers });
                          }}
                        >
                          Я не пойду
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn-subscribe btn btn-outline-success"
                          onClick={() => {
                            const copyMembers = [...event.members];
                            copyMembers.push(localStorage.token);
                            changeEvent({ ...event, members: copyMembers });
                          }}
                        >
                          Я пойду
                        </button>
                      )}
                      <div className="btns-section">
                        <button
                          type="button"
                          className="btn-edit btn btn-outline-dark"
                          onClick={() => {
                            setModalShow(true);
                            setCurrentEvent(event);
                          }}
                        >
                          Редактировать
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-block ml-3"
                          onClick={() => {
                            removeEvent(event);
                          }}
                          style={
                            event.dateNum < Date.parse(dateNow)
                              ? { width: "517px" }
                              : { width: "48%" }
                          }
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                    <span className="event-members">
                      Пойдут на мероприятие: {event.members.length}
                    </span>
                  </div>
                </div>
              );
            }
          })
        : allEvents.map((event) => {
            // Если указан диапазон дат в настройках фильтрации, то отображаются мероприятия, которые находятся в архиве
            if (
              dateRange &&
              event.dateNum > dateRange[0] &&
              event.dateNum < dateRange[1]
            ) {
              return (
                <div className="event d-flex" key={event.id}>
                  <div className="left-section">
                    <div className="event-header">
                      <h3>{event.name}</h3>
                    </div>
                    <p className="event-date">
                      Дата и время:{" "}
                      <span style={{ fontWeight: "400" }}>{event.date}</span>
                    </p>
                    <p className="event-place">
                      Место:{" "}
                      <span style={{ fontWeight: "400" }}>{event.place}</span>
                    </p>
                    <p className="event-organizer">
                      Организатор:
                      <span style={{ fontWeight: "400" }}>
                        {" "}
                        {
                          currentUsers.find((user) => user.id === event.user)
                            .surname
                        }{" "}
                        {
                          currentUsers.find((user) => user.id === event.user)
                            .firstname
                        }{" "}
                        {
                          currentUsers.find((user) => user.id === event.user)
                            .patronymic
                        }
                      </span>
                    </p>
                  </div>
                  <div className="right-section">
                    <div className="event-description">
                      <pre>{event.description}</pre>
                    </div>
                    <div className="btns-section" id="block">
                      <div className="btns-section">
                        <button
                          type="button"
                          className="btn-edit btn btn-outline-dark"
                          onClick={() => {
                            setModalShow(true);
                            setCurrentEvent(event);
                          }}
                        >
                          Редактировать
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-block ml-3"
                          onClick={() => {
                            removeEvent(event);
                          }}
                          style={{ width: "48%" }}
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                    <span className="event-members">
                      Было на мероприятии: {event.members.length}
                    </span>
                  </div>
                </div>
              );
            }

            // Если не указан диапазон дат в настройках фильтрации, то отображаются архивные мероприятия
            if (!dateRange && event.dateNum < Date.parse(dateNow)) {
              return (
                <div className="event d-flex" key={event.id}>
                  <div className="left-section">
                    <div className="event-header">
                      <h3>{event.name}</h3>
                    </div>
                    <p className="event-date">
                      Дата и время:{" "}
                      <span style={{ fontWeight: "400" }}>{event.date}</span>
                    </p>
                    <p className="event-place">
                      Место:{" "}
                      <span style={{ fontWeight: "400" }}>{event.place}</span>
                    </p>
                    <p className="event-organizer">
                      Организатор:
                      <span style={{ fontWeight: "400" }}>
                        {" "}
                        {
                          currentUsers.find((user) => user.id === event.user)
                            .surname
                        }{" "}
                        {
                          currentUsers.find((user) => user.id === event.user)
                            .firstname
                        }{" "}
                        {
                          currentUsers.find((user) => user.id === event.user)
                            .patronymic
                        }
                      </span>
                    </p>
                  </div>
                  <div className="right-section">
                    <div className="event-description">
                      <pre>{event.description}</pre>
                    </div>
                    <div className="btns-section">
                      <button
                        type="button"
                        className="btn-edit btn btn-outline-dark"
                        onClick={() => {
                          setModalShow(true);
                          setCurrentEvent(event);
                        }}
                      >
                        Редактировать
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-block ml-3"
                        onClick={() => {
                          removeEvent(event);
                        }}
                        style={{ width: "48%" }}
                      >
                        Удалить
                      </button>
                    </div>
                    <span className="event-members">
                      {event.members.length}
                    </span>
                  </div>
                </div>
              );
            }
          })}
      {currentEvent && (
        <ModalEdit
          show={modalShow}
          event={currentEvent}
          onHide={() => {
            setModalShow(false);
          }}
        />
      )}
    </>
  );
};

export default AdminEvents;
