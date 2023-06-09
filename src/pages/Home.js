import { useState } from "react";
import Header from "../components/Header";
import HiddenEvents from "../components/HiddenEvents";
import Events from "../components/Events";
import Button from "react-bootstrap/Button";
import ModalSettings from "../components/ModalSettings";
import { useSelector } from "react-redux";
import AdminEvents from "../components/AdminEvents";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  let headContent = "Текущие мероприятия";
  if (localStorage.eventType) {
    headContent =
      localStorage.eventType === "Текущие"
        ? "Текущие мероприятия"
        : "Архив мероприятий";
  }
  const currentUsers = useSelector((state) => state.users.users);
  const currentUser = currentUsers.find(
    (user) => user.id === localStorage.token
  );
  const isAdmin = currentUser && currentUser.role === "Администратор" ? true : false;
  const isBlocked =
    currentUser && currentUser.role === "Заблокирован" ? true : false;
  return (
    <>
      <Header></Header>
      {isBlocked ? (
        <div className="d-flex flex-column align-items-center">
          <div className="div-alert d-flex flex-column">
            <div
              className="alert alert-info alert-dismissible fade in show mb-4 mt-4"
              role="alert"
              style={{ maxWidth: "800px" }}
            >
              <strong>Уважаемый пользователь!</strong> Администратор сайта был
              вынужден заблокировать Ваш аккаунт в связи с нарушением правил
              нашей платформы.
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
        </div>
      ) : (
        <div className="events-section d-flex flex-column">
          <div className="home-page-head">
            <h1 className="events-head">
              {headContent}
              <button
                className="event-settings"
                onClick={() => setModalShow(true)}
              >
                Настройки
              </button>
            </h1>
          </div>
          {!localStorage.firstname ? (
            <div className="div-alert">
              <div
                className="alert alert-info alert-dismissible fade in show mb-4"
                role="alert"
                style={{ maxWidth: "1000px" }}
              >
                <strong>Уважаемый пользователь!</strong> Для просмотра полной
                информации о мероприятиях, а также для участия в них необходимо
                зарегистрироваться или авторизоваться.
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
            <></>
          )}
          <div className="events d-flex pb-5">
            {localStorage.firstname ? (
              isAdmin ? (
                <AdminEvents></AdminEvents>
              ) : (
                <Events></Events>
              )
            ) : (
              <HiddenEvents></HiddenEvents>
            )}
          </div>

          <ModalSettings show={modalShow} onHide={() => setModalShow(false)} />
        </div>
      )}
    </>
  );
};

export default Home;
