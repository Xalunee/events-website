import React, { Component } from "react";
import { removeUser, updateUser } from "../services/users";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
    };
  }

  renderTableData() {
    return this.state.users.map((user, index) => {
      const { id, firstname, surname, patronymic, email, password, role } =
        user;
      const funcClick = (e) => {
        const newRole = e.target.textContent;
        const data = {
          id,
          surname,
          firstname,
          patronymic,
          email,
          password,
          role: newRole,
        };
        updateUser(data, id);
        const parentElement =
          e.target.parentElement.parentElement.parentElement.parentElement;
        const roleElement = parentElement.querySelector(".role");
        roleElement.textContent = newRole;
      };
      return (
        <tr key={id}>
          <td>{index + 1}</td>
          <td>{surname}</td>
          <td>{firstname}</td>
          <td>{patronymic}</td>
          <td>{email}</td>
          <td className="role">{role}</td>
          {localStorage.token !== id ? (
            <td className="d-flex gap-2">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenu2"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Поменять роль
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={funcClick}
                  >
                    Администратор
                  </button>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={funcClick}
                  >
                    Пользователь
                  </button>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={funcClick}
                  >
                    Заблокирован
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={(e) => {
                  const parentElement = e.target.parentElement.parentElement;
                  parentElement.remove();
                  removeUser(id);
                  window.location.reload();
                }}
              >
                Удалить
              </button>
            </td>
          ) : (
            <td>------------</td>
          )}
        </tr>
      );
    });
  }

  renderTableHeader() {
    let header = [
      "id",
      "фамилия",
      "имя",
      "отчество",
      "почта",
      "роль",
      "Дополнительно",
    ];
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  render() {
    return (
      <div className="table-users">
        <table id="users">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table; //exporting a component make it reusable and this is the beauty of react
