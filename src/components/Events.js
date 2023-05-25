import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { subscribeToEvent } from "../services/event.js";
import { changeEvent } from "../services/event.js";

const Home = () => {
  const dateNow = new Date();
  const allEvents = useSelector((state) => state.events.events);
  const currentUsers = useSelector((state) => state.users.users);
  const eventType = localStorage.eventType ? localStorage.eventType : "Текущие";
  const localDateRange = localStorage.dateRange ? localStorage.dateRange.split(',') : null;
  const dateRange = localStorage.dateRange ? [Number(localDateRange[0]), Number(localDateRange[1])] : null;
  return (
    <>
      {eventType === "Текущие"
        ? allEvents.map((event) => {
          if (dateRange && event.dateNum > dateRange[0] && event.dateNum < dateRange[1]) {
            return (
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
                    {
                      currentUsers.find((user) => user.id === event.user)
                        .firstname
                    }{" "}
                    {
                      currentUsers.find((user) => user.id === event.user)
                        .patronymic
                    }
                  </p>
                </div>
                <div className="right-section">
                  <div className="event-description">
                    <pre>{event.description}</pre>
                  </div>
                  <div className="btns-section">
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
  
                    <span className="event-members">{event.members.length}</span>
                  </div>
                </div>
              </div>
            )
          }
          if (!dateRange && event.dateNum > Date.parse(dateNow)) {
            return (
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
                    {
                      currentUsers.find((user) => user.id === event.user)
                        .firstname
                    }{" "}
                    {
                      currentUsers.find((user) => user.id === event.user)
                        .patronymic
                    }
                  </p>
                </div>
                <div className="right-section">
                  <div className="event-description">
                    <pre>{event.description}</pre>
                  </div>
                  <div className="btns-section">
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
  
                    <span className="event-members">{event.members.length}</span>
                  </div>
                </div>
              </div>
            )
          }
        }
        )
        : allEvents.map((event) => {
          if (dateRange && event.dateNum > dateRange[0] && event.dateNum < dateRange[1]) {
            return (
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
                    {
                      currentUsers.find((user) => user.id === event.user)
                        .firstname
                    }{" "}
                    {
                      currentUsers.find((user) => user.id === event.user)
                        .patronymic
                    }
                  </p>
                </div>
                <div className="right-section">
                  <div className="event-description">
                    <pre>{event.description}</pre>
                  </div>
                  <div className="btns-section">
                    <span className="event-members">{event.members.length}</span>
                  </div>
                </div>
              </div>
            )
          }
          if (!dateRange && event.dateNum < Date.parse(dateNow)) {
            return (
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
                    {
                      currentUsers.find((user) => user.id === event.user)
                        .firstname
                    }{" "}
                    {
                      currentUsers.find((user) => user.id === event.user)
                        .patronymic
                    }
                  </p>
                </div>
                <div className="right-section">
                  <div className="event-description">
                    <pre>{event.description}</pre>
                  </div>
                  <div className="btns-section">
                    <span className="event-members">{event.members.length}</span>
                  </div>
                </div>
              </div>
            )
          }
        }
        )}
    </>
  );
};

export default Home;
