import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { subscribeToEvent } from "../services/event.js";
import { removeEvent } from "../services/event.js";

const Home = () => {
  const currentEvents = useSelector((state) => state.events.events);
  const currentUsers = useSelector((state) => state.users.users);
  return (
    <>
      {currentEvents.map((event) => (
        event.user === localStorage.token ?
        <div className="event d-flex">
          <div className="left-section">
            <div className="event-header">
              <h3>{event.name}</h3>
            </div>
            <p className="event-date">Дата и время: {event.date}</p>
            <p className="event-place">Место: {event.place}</p>
            <p className="event-organizer">
              Организатор:{" "}
              {currentUsers.find((user) => user.id === event.user).surname}{" "}
              {currentUsers.find((user) => user.id === event.user).firstname}{" "}
              {currentUsers.find((user) => user.id === event.user).patronymic}
            </p>
          </div>
          <div className="right-section">
            <div className="event-description">
              <pre>{event.description}</pre>
            </div>
            <div className="btns-section">
              <button type="button" className="btn-edit btn btn-outline-dark">Редактировать</button>
              <button
                  type="button"
                  className="btn-subscribe btn btn-outline-danger"
                  onClick={() => {
                    removeEvent(event);
                  }}
                >
                  Удалить
                </button>
              <span className="event-members">{event.members.length}</span>
            </div>
          </div>
        </div>
        : <></>
      ))}
    </>
  );
};

export default Home;
