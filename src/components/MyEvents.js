import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { subscribeToEvent } from "../services/event.js";
import { removeEvent } from "../services/event.js";
import ModalEdit from "./ModalEdit.js";

const Home = () => {
  const [currentEvent, setCurrentEvent] = useState('');
  const dateNow = new Date();
  const currentEvents = useSelector((state) => state.events.events);
  const currentUsers = useSelector((state) => state.users.users);
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      {currentEvents.map((event) =>
        event.user === localStorage.token ? (
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
                {event.dateNum > Date.parse(dateNow) ? (
                  <button
                    type="button"
                    className="btn-edit btn btn-outline-dark"
                    onClick={() => {
                      setModalShow(true)
                      setCurrentEvent(event);
                    }}
                  >
                    Редактировать
                  </button>
                ) : (
                  ""
                )}
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
              <span className="event-members">Пойдут на мероприятие: {event.members.length}</span>
            </div>
            <ModalEdit show={modalShow} event={currentEvent} onHide={() => {
              document.querySelector('#inputPlace').defaultValue = '';
              console.log(document.querySelector('#inputPlace'))
              setModalShow(false)
            }} />
          </div>
        ) : (
          <></>
        )
      )}
    </>
  );
};

export default Home;
