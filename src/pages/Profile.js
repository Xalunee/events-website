import { useEffect, useState } from "react";
import Header from "../components/Header";
import MyEvents from "../components/MyEvents";
import EventForm from "../components/EventForm";
import { useSelector } from "react-redux";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const currentUsers = useSelector((state) => state.users.users);
  const currentUser = currentUsers.find(
    (user) => user.id === localStorage.token
  );
  const isBlocked =
    currentUser && currentUser.role === "blocked" ? true : false;
  return (
    <>
      <Header />
      {isBlocked ? (
        <div className="d-flex flex-column align-items-center">
          <div
            className="alert alert-info alert-dismissible fade in show mb-4 mt-4"
            role="alert"
            style={{ maxWidth: "800px" }}
          >
            <strong>Уважаемый пользователь!</strong> Администратор сайта был
            вынужден заблокировать Ваш аккаунт в связи с нарушением правил нашей
            платформы.
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => {
                const alert = document.querySelector(".alert");
                console.log(alert);
                alert.classList.remove("show");
                setTimeout(() => {
                  alert.remove();
                }, "300");
              }}
            ></button>
          </div>
        </div>
      ) : (
        <>
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
      )}
    </>
  );
};

export default Home;
