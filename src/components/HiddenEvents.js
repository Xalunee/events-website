import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { cutDescription, subscribeToEvent } from "../services/event.js";
import { changeEvent } from "../services/event.js";
import { storage } from "../services/init.js";
import { ref, listAll, getDownloadURL } from 'firebase/storage';

const HiddenEvents = () => {
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
    const doMore = (e) => {
      const element = e.target;
      const elementEvent = element.parentNode.parentNode;
      const elementEventOther = elementEvent.querySelector('.event-other');
      const elementImg = elementEvent.querySelector('.img-more');
      if (elementEvent.classList.contains('collapsed')) {
        elementEvent.classList.remove('collapsed');
        elementEvent.classList.add('expanded');
        if (elementEvent) {
          elementEvent.style.height = 'auto';
        }
        elementEventOther.style.maxHeight = '1000px';
        elementImg.src = require("../assets/arrow\ down\ reverse.png");
      } else {
        const clientWidth = document.documentElement.clientWidth;
        elementEventOther.style.maxHeight = clientWidth === 414 ? '200px' : '103px';
        elementEvent.classList.remove('expanded');
        elementEvent.classList.add('collapsed');
        elementImg.src = require("../assets/arrow\ down.png");
        setTimeout(() => {
          if (elementEvent) {
            elementEvent.style.height = '625px';
          }
        }, 1500)
      }
    };
  
    const imageListRef = ref(storage, "images/")
    const [imageList, setImageList] = useState([]);
    useEffect(() => {
      listAll(imageListRef).then((response) => {
        response.items.forEach((item) => {
          const path = item._location.path;
          const cuttedPath = path.slice(7);
          getDownloadURL(item).then((url) => {
            setImageList((prev) => [...prev, {path: cuttedPath, url}]);
          })
        })
      })
    }, []);
    const findImg = (imageId) => {
      const findedImg = imageList.find((image) => image.path === imageId);
      return findedImg ? findedImg : {url: require('../assets/none-image.png')};
    };
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
              const imageObj = event.imageId ? findImg(event.imageId).url : require('../assets/none-image.png');
              return (
                <div className="event collapsed" key={event.id}>
                  <img src={imageObj} className="event-img"></img>
                  <div className="event-header">
                    <h2>{event.name}</h2>
                  </div>
                  <div className="event-other">
                    <div className="event-description">
                      <p className="title">Описание</p>
                      <pre className="description-text">{event.description.slice(0, 45)}...</pre>
                    </div>
                    <div className="event-date">
                      <p className="title">Дата и время</p>
                      <span style={{ fontWeight: "400" }}>...</span>
                    </div>
                    <p className="event-place">
                      <p className="title">Место</p>
                      <span style={{ fontWeight: "400" }}>...</span>
                    </p>
                    <p className="event-organizer">
                      <p className="title">Организатор</p>
                      <span style={{ fontWeight: "400" }}>...
                      </span>
                    </p>
                    <span className="event-members">
                      <b>Пойдут на мероприятие:</b> {event.members.length}
                    </span>
                  </div>
                  <div className="btns-section">
                    <button type="button" className="btn-more" onClick={(e) => doMore(e)}>
                      <img src={require("../assets/arrow\ down.png")} className="img-more"></img>
                      Подробнее
                    </button>
                    {localStorage.token &&
                    event.members.includes(localStorage.token) ? (
                      <button
                        type="button"
                        className="btn-subscribe"
                        onClick={() => {
                          const copyMembers = [...event.members];
                          const userIndex = copyMembers.indexOf(
                            localStorage.token
                          );
                          copyMembers.splice(userIndex, userIndex);
                          changeEvent({ ...event, members: copyMembers });
                        }}
                      >
                        Я пойду!
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn-unsubscribe"
                        onClick={() => {
                          const copyMembers = [...event.members];
                          copyMembers.push(localStorage.token);
                          changeEvent({ ...event, members: copyMembers });
                        }}
                      >
                        Я пойду!
                      </button>
                    )}
                  </div>
                </div>
              );
            }

            // Если не указан диапазон дат, то выводятся текущие мероприятия
            if (!dateRange && event.dateNum > Date.parse(dateNow)) {
              const imageObj = event.imageId ? findImg(event.imageId).url : require('../assets/none-image.png');
              return (
                <div className="event collapsed" key={event.id}>
                  <img src={imageObj} className="event-img"></img>
                  <div className="event-header">
                    <h2>{event.name}</h2>
                  </div>
                  <div className="event-other">
                    <div className="event-description">
                      <p className="title">Описание</p>
                      <pre className="description-text">{event.description.slice(0, 45)}...</pre>
                    </div>
                    <div className="event-date">
                      <p className="title">Дата и время</p>
                      <span style={{ fontWeight: "400" }}>...</span>
                    </div>
                    <p className="event-place">
                      <p className="title">Место</p>
                      <span style={{ fontWeight: "400" }}>...</span>
                    </p>
                    <p className="event-organizer">
                      <p className="title">Организатор</p>
                      <span style={{ fontWeight: "400" }}>...</span>
                    </p>
                    <span className="event-members">
                      <b>Пойдут на мероприятие:</b> {event.members.length}
                    </span>
                  </div>
                  <div className="btns-section">
                    <button type="button" className="btn-more" onClick={(e) => doMore(e)}>
                      <img src={require("../assets/arrow\ down.png")} className="img-more"></img>
                      Подробнее
                    </button>
                    {localStorage.token &&
                    event.members.includes(localStorage.token) ? (
                      <button
                        type="button"
                        className="btn-subscribe"
                        onClick={() => {
                          const copyMembers = [...event.members];
                          const userIndex = copyMembers.indexOf(
                            localStorage.token
                          );
                          copyMembers.splice(userIndex, userIndex);
                          changeEvent({ ...event, members: copyMembers });
                        }}
                      >
                        Я пойду!
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn-unsubscribe"
                        onClick={() => {
                          const copyMembers = [...event.members];
                          copyMembers.push(localStorage.token);
                          changeEvent({ ...event, members: copyMembers });
                        }}
                      >
                        Я пойду!
                      </button>
                    )}
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
              const imageObj = event.imageId ? findImg(event.imageId).url : require('../assets/none-image.png');
              return (
                <div className="event collapsed" key={event.id}>
                  <img src={imageObj} className="event-img"></img>
                  <div className="event-header">
                    <h2>{event.name}</h2>
                  </div>
                  <div className="event-other">
                    <div className="event-description">
                      <p className="title">Описание</p>
                      <pre className="description-text">{event.description.slice(0, 45)}...</pre>
                    </div>
                    <div className="event-date">
                      <p className="title">Дата и время</p>
                      <span style={{ fontWeight: "400" }}>...</span>
                    </div>
                    <p className="event-place">
                      <p className="title">Место</p>
                      <span style={{ fontWeight: "400" }}>...</span>
                    </p>
                    <p className="event-organizer">
                      <p className="title">Организатор</p>
                      <span style={{ fontWeight: "400" }}>...</span>
                    </p>
                    <span className="event-members">
                      <b>Было на мероприятии</b> {event.members.length}
                    </span>
                  </div>
                  <div className="btns-section">
                    <button type="button" className="btn-more" onClick={(e) => doMore(e)}>
                      <img src={require("../assets/arrow\ down.png")} className="img-more"></img>
                      Подробнее
                    </button>
                    {localStorage.token &&
                    event.members.includes(localStorage.token) ? (
                      <button
                        type="button"
                        className="btn-subscribe"
                        onClick={() => {
                          const copyMembers = [...event.members];
                          const userIndex = copyMembers.indexOf(
                            localStorage.token
                          );
                          copyMembers.splice(userIndex, userIndex);
                          changeEvent({ ...event, members: copyMembers });
                        }}
                      >
                        Я пойду!
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn-unsubscribe"
                        onClick={() => {
                          const copyMembers = [...event.members];
                          copyMembers.push(localStorage.token);
                          changeEvent({ ...event, members: copyMembers });
                        }}
                      >
                        Я пойду!
                      </button>
                    )}
                  </div>
                </div>
              );
            }

            // Если не указан диапазон дат в настройках фильтрации, то отображаются архивные мероприятия
            if (!dateRange && event.dateNum < Date.parse(dateNow)) {
              const imageObj = event.imageId ? findImg(event.imageId).url : require('../assets/none-image.png');
              return (
                <div className="event collapsed" key={event.id}>
                  <img src={imageObj} className="event-img"></img>
                  <div className="event-header">
                    <h2>{event.name}</h2>
                  </div>
                  <div className="event-other">
                    <div className="event-description">
                      <p className="title">Описание</p>
                      <pre className="description-text">{event.description.slice(0, 45)}...</pre>
                    </div>
                    <div className="event-date">
                      <p className="title">Дата и время</p>
                      <span style={{ fontWeight: "400" }}>...</span>
                    </div>
                    <p className="event-place">
                      <p className="title">Место</p>
                      <span style={{ fontWeight: "400" }}>...</span>
                    </p>
                    <p className="event-organizer">
                      <p className="title">Организатор</p>
                      <span style={{ fontWeight: "400" }}>...</span>
                    </p>
                    <span className="event-members">
                      <b>Было на мероприятии</b> {event.members.length}
                    </span>
                  </div>
                  <div className="btns-section">
                    <button type="button" className="btn-more" onClick={(e) => doMore(e)}>
                      <img src={require("../assets/arrow\ down.png")} className="img-more"></img>
                      Подробнее
                    </button>
                  </div>
                </div>
              );
            }
          })}
    </>
  );
};

export default HiddenEvents;
