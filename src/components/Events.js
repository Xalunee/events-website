import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { subscribeToEvent } from "../services/event.js";
import { changeEvent } from "../services/event.js";

const Home = () => {
  const currentEvents = useSelector((state) => state.events.events);
  const currentUsers = useSelector((state) => state.users.users);
  return (
    <>
      {currentEvents.map((event) => (
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
            <div className="subscribe-section">
              {localStorage.token &&
              event.members.includes(localStorage.token) ? (
                <button
                  type="button"
                  className="event-btn btn btn-outline-danger"
                  onClick={() => {
                    const copyMembers = [...event.members];
                    const userIndex = copyMembers.indexOf(localStorage.token);
                    copyMembers.splice(userIndex, userIndex);
                    changeEvent({...event, members: copyMembers})
                  }}
                >
                  Отсоединиться
                </button>
              ) : (
                <button
                  type="button"
                  className="event-btn btn btn-outline-success"
                  onClick={() => {
                    const copyMembers = [...event.members];
                    copyMembers.push(localStorage.token)
                    changeEvent({...event, members: copyMembers})
                  }}
                >
                  Присоединиться
                </button>
              )}

              <span className="event-members">{event.members.length}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
