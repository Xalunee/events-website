import { useState } from "react";
import { useSelector } from "react-redux";
import { removeEvent } from "../services/event.js";
import ModalEdit from "./ModalEdit.js";

const Home = () => {
  const [currentEvent, setCurrentEvent] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const dateNow = new Date();
  const currentEvents = useSelector((state) => state.events.events);
  const currentUsers = useSelector((state) => state.users.users);
  return (
    <>
      {currentEvents.map((event) =>
        event.user === localStorage.token ? (
          <div className="event d-flex" key={event.id}>
            <div className="left-section">
              <div className="event-header">
                <h3>{event.name}</h3>
              </div>
              <p className="event-date">Дата и время: <span style={{fontWeight: "400"}}>{event.date}</span></p>
              <p className="event-place">Место: <span style={{fontWeight: "400"}}>{event.place}</span></p>
              <p className="event-organizer">
                Организатор:<span style={{fontWeight: "400"}}>{" "}
                {currentUsers.find((user) => user.id === event.user).surname}{" "}
                {currentUsers.find((user) => user.id === event.user).firstname}{" "}
                {currentUsers.find((user) => user.id === event.user).patronymic}
                </span>
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
            {currentEvent && <ModalEdit show={modalShow} event={currentEvent} onHide={() => {
              setModalShow(false)
            }} />}
          </div>
        ) : (
          <></>
        )
      )}
    </>
  );
};

export default Home;
