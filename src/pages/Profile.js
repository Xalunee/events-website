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
        <>
          <div className="events-section d-flex flex-column">
            {!localStorage.token ? (
              <div className="div-alert">
                <div
                  className="alert alert-info alert-dismissible fade in show mb-4"
                  role="alert"
                  style={{ maxWidth: "1000px" }}
                >
                  <strong>Уважаемый пользователь!</strong> Для просмотра данной
                  страницы необходимо зарегистрироваться.
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
                {" "}
                <div className="profile-page-head">
                  <h1>
                    Мои мероприятия
                    <button
                      type="button"
                      className="btn-create-event"
                      onClick={() => setModalShow(true)}
                    >
                      Создать мероприятие
                    </button>
                  </h1>
                </div>
                <div className="events d-flex pb-5">
                  <EventForm
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                  <MyEvents />
                </div>
              </>
            )}
          </div>
          <div className="pb-5"></div>
        </>
      )}
    </>
  );
};

export default Home;
