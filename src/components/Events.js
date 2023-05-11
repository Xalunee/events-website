import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { getEvents } from "../services/event.js";

const Home = () => {
  const currentEvents = useSelector((state) => state.events.events);
  const [events, setEvents] = useState(currentEvents.at(-1)?.id);
  useEffect(() => {
    if (!events) {
      setEvents(currentEvents.at(-1));
    }
  }, [currentEvents]);
  console.log(currentEvents)
  return (
    <>
      {events.map((event) => <p>{event.name}</p>)}
      <div className="event d-flex">
        <div className="left-section">
          <div className="event-header">
            <h3>Прогулка</h3>
          </div>
          <p className="event-date">Дата и время: 04.05.2023 12:00</p>
          <p className="event-place">Место: городской парк</p>
          <p className="event-organizer">Организатор: Александр Прокофьев</p>
        </div>
        <div className="right-section">
          <div className="event-description">
            <pre>
              Всем привет! Хочу пригласить участников клуба на дружелюбную
              встречу. Встреча будет проходить среди тех, у кого есть
              электросамокат. Контактные данные: @AlexandrOfficial - телеграм
              89172747815
            </pre>
          </div>
          <div className="subscribe-section">
            <button type="button" className="event-btn btn btn-outline-dark">
              Присоединиться
            </button>
            <span className="event-members">12</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
