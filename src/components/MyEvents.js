import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { removeEvent } from "../services/event.js";
import ModalEdit from "./ModalEdit.js";
import { changeEvent } from "../services/event.js";
import { storage } from "../services/init.js";
import { ref, listAll, getDownloadURL } from "firebase/storage";

const Home = () => {
  // return (
  //   <>
  //     {currentEvents.map((event) =>
  //       event.user === localStorage.token ? (
  //         <div className="event d-flex" key={event.id}>
  //           <div className="left-section">
  //             <div className="event-header">
  //               <h3>{event.name}</h3>
  //             </div>
  //             <p className="event-date">Дата и время: <span style={{fontWeight: "400"}}>{event.date}</span></p>
  //             <p className="event-place">Место: <span style={{fontWeight: "400"}}>{event.place}</span></p>
  //             <p className="event-organizer">
  //               Организатор:<span style={{fontWeight: "400"}}>{" "}
  //               {currentUsers.find((user) => user.id === event.user).surname}{" "}
  //               {currentUsers.find((user) => user.id === event.user).firstname}{" "}
  //               {currentUsers.find((user) => user.id === event.user).patronymic}
  //               </span>
  //             </p>
  //           </div>
  //           <div className="right-section">
  //             <div className="event-description">
  //               <pre>{event.description}</pre>
  //             </div>
  //             <div className="btns-section">
  //               {event.dateNum > Date.parse(dateNow) ? (
  //                 <button
  //                   type="button"
  //                   className="btn-edit btn btn-outline-dark"
  //                   onClick={() => {
  //                     setModalShow(true)
  //                     setCurrentEvent(event);
  //                   }}
  //                 >
  //                   Редактировать
  //                 </button>
  //               ) : (
  //                 ""
  //               )}
  //               <button
  //                 type="button"
  //                 className="btn btn-outline-danger btn-block ml-3"
  //                 onClick={() => {
  //                   removeEvent(event);
  //                 }}
  //                 style={
  //                   event.dateNum < Date.parse(dateNow)
  //                     ? { width: "517px" }
  //                     : { width: "48%" }
  //                 }
  //               >
  //                 Удалить
  //               </button>
  //             </div>
  //             <span className="event-members">Пойдут на мероприятие: {event.members.length}</span>
  //           </div>
  //           {currentEvent && <ModalEdit show={modalShow} event={currentEvent} onHide={() => {
  //             setModalShow(false)
  //           }} />}
  //         </div>
  //       ) : (
  //         <></>
  //       )
  //     )}
  //   </>
  // );
  const [currentEvent, setCurrentEvent] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const dateNow = new Date();
  const currentEvents = useSelector((state) => state.events.events);

  const doMore = (e) => {
    const element = e.target;
    const elementEvent = element.parentNode.parentNode;
    const elementEventOther = elementEvent.querySelector('.event-other');
    const elementImg = elementEvent.querySelector('.img-more');
    const textDescription = elementEvent.querySelector('.event-other pre');
    if (elementEvent.classList.contains('collapsed')) {
      if (elementEvent && elementEventOther) {
        elementEvent.classList.remove('collapsed');
        textDescription.classList.remove('hidden');
        elementEvent.classList.add('expanded');
        elementEvent.style.height = 'auto';
        elementEventOther.style.maxHeight = '1000px';
        elementImg.src = require("../assets/arrow\ down\ reverse.png");
      }
    } else {
      if (elementEvent && elementEventOther) {
        elementEventOther.style.maxHeight = '140px';
        elementEvent.classList.remove('expanded');
        elementEvent.classList.add('collapsed');
        elementImg.src = require("../assets/arrow\ down.png");
        setTimeout(() => {
          textDescription.classList.add('hidden');
          elementEvent.style.height = '625px';
        }, 1500)
      }
    }
  };

  const allEvents = useSelector((state) => state.events.events);
  const currentUsers = useSelector((state) => state.users.users);
  const eventType = localStorage.eventType ? localStorage.eventType : "Текущие";
  const localDateRange = localStorage.dateRange
    ? localStorage.dateRange.split(",")
    : null;
  const dateRange = localStorage.dateRange
    ? [Number(localDateRange[0]), Number(localDateRange[1])]
    : null;

  const imageListRef = ref(storage, "images/");
  const [imageList, setImageList] = useState([]);
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        const path = item._location.path;
        const cuttedPath = path.slice(7);
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, { path: cuttedPath, url }]);
        });
      });
    });
  }, []);
  const findImg = (imageId) => {
    const findedImg = imageList.find((image) => image.path === imageId);
    return findedImg ? findedImg : { url: require("../assets/none-image.png") };
  };

  return (
    <>
      {allEvents.map((event) => {
        if (event.user === localStorage.token) {
          const imageObj = event.imageId
            ? findImg(event.imageId).url
            : require("../assets/none-image.png");
          return (
            <div className="event collapsed" key={event.id}>
              <img src={imageObj} className="event-img"></img>
              <div className="event-header">
                <h2>{event.name}</h2>
              </div>
              <div className="event-other">
                <div className="event-description">
                  <p className="title">Описание</p>
                  <pre className="description-text hidden">{event.description}</pre>
                </div>
                <div className="event-date">
                  <p className="title">Дата и время</p>
                  <span style={{ fontWeight: "400" }}>{event.date}</span>
                </div>
                <p className="event-place">
                  <p className="title">Место</p>
                  <span style={{ fontWeight: "400" }}>{event.place}</span>
                </p>
                <p className="event-organizer">
                  <p className="title">Организатор</p>
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
                <span className="event-members">
                  <b>Пойдут на мероприятие:</b> {event.members.length}
                </span>
              </div>
              <div className="btns-section">
                {event.dateNum > Date.parse(dateNow) ? (
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => {
                      setModalShow(true);
                      setCurrentEvent(event);
                    }}
                    style={
                      event.dateNum < Date.parse(dateNow)
                        ? { width: "517px" }
                        : { width: "48.4%" }
                    }
                  >
                    Редактировать
                  </button>
                ) : (
                  ""
                )}
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => {
                    removeEvent(event);
                  }}
                  style={
                    event.dateNum < Date.parse(dateNow)
                      ? { width: "517px" }
                      : { width: "48.4%" }
                  }
                >
                  Удалить
                </button>
                <button
                  type="button"
                  className="btn-more"
                  onClick={(e) => doMore(e)}
                  style={{ width: "100%", paddingLeft: "0" }}
                >
                  <img
                    style={{ left: "30%" }}
                    src={require("../assets/arrow down.png")}
                    className="img-more"
                  ></img>
                  Подробнее
                </button>
              </div>
              {currentEvent && <ModalEdit show={modalShow} event={currentEvent} onHide={() => {
                setModalShow(false)
              }} />}
            </div>
          );
        }
      })}
    </>
  );
};

export default Home;
