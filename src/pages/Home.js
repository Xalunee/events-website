import { useState } from "react";
import Header from "../components/Header";
import Events from "../components/Events";
import Button from "react-bootstrap/Button";
import ModalSettings from "../components/ModalSettings";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  let headContent = "Текущие меропиятия";
  if (localStorage.eventType) {
    headContent =
      localStorage.eventType === "Текущие"
        ? "Текущие мероприятия"
        : "Архив мероприятий";
  }
  return (
    <>
      <Header></Header>
      <div className="home-page-head">
        <h1 className="events-head text-center mb-4 mt-3">
          {headContent}
          <Button
            className="event-settings"
            onClick={() => setModalShow(true)}
          ></Button>
        </h1>
      </div>
      <div className="d-flex flex-column align-items-center gap-5 pb-5">
        <Events></Events>
      </div>

      <ModalSettings show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default Home;
