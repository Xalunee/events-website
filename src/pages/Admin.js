import Header from "../components/Header";
import Table from "../components/Table";
import { useSelector } from "react-redux";

const Home = () => {
  const currentUsers = useSelector((state) => state.users.users);
  const currentUser = currentUsers.find(
    (user) => user.id === localStorage.token
  );
  const isAdmin = currentUser && currentUser.role === "Администратор" ? true : false;
  return (
    <>
      <Header />
      {isAdmin ? (
        <>
          <h1 className="text-center mt-3 mb-4" id="title">
            Список пользователей
          </h1>
          <div className="d-flex flex-column align-items-center gap-5 pb-5">
            {currentUsers.length > 0 ? <Table users={currentUsers} /> : <></>}
          </div>
        </>
      ) : (
        <div className="users d-flex flex-column align-items-center gap-5 pb-5">
          <div
            className="users alert alert-info alert-dismissible fade in show mb-4 mt-4"
            role="alert"
            style={{ maxWidth: "1000px" }}
          >
            <strong>Уважаемый пользователь!</strong> Просматривать данную страницу может только администратор.
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
      )}
    </>
  );
};

export default Home;
