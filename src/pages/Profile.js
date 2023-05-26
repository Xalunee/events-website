import { useEffect, useState } from "react";
import Header from "../components/Header";
import MyEvents from "../components/MyEvents";
import EventForm from "../components/EventForm";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Header />
      <h1 className="text-center mt-3">Мои мероприятия</h1>
      <div className="d-flex flex-column align-items-center gap-5 pb-5">
        <button
          type="button"
          className="btn-create-event btn btn-outline-success btn-lg btn-block mt-4"
          onClick={() => setModalShow(true)}
        >
          Создать мероприятие
        </button>
        <EventForm show={modalShow} onHide={() => setModalShow(false)} />
        <MyEvents />
      </div>
      <div className="pb-5"></div>
    </>
  );
};

export default Home;
