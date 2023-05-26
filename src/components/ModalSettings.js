import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DatePicker, { registerLocale } from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import addDays from "date-fns/addDays";

export default function ModalSettings(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    localStorage.eventType = data.eventType;
    localStorage.dateRange = datesNum;
    props.onHide();
  };
  const typeOfEvent = localStorage.eventType
    ? localStorage.eventType
    : "Текущие";
  const [currentTypeOfEvent, setCurrentTypeOfEvent] = useState(typeOfEvent);
  const localDateRange = localStorage.dateRange
    ? localStorage.dateRange.split(",")
    : null;
  const formattedDateRange = localStorage.dateRange
    ? [Number(localDateRange[0]), Number(localDateRange[1])]
    : null;
  let defaultDateRange;
  let originalDate;
  if (currentTypeOfEvent === "Текущие") {
    originalDate = formattedDateRange
      ? [formattedDateRange[0], formattedDateRange[1]]
      : [addDays(new Date(), 0), addDays(new Date(), 183)];
    defaultDateRange = [addDays(new Date(), 0), addDays(new Date(), 183)];
  } else if (currentTypeOfEvent === "Архив") {
    originalDate = formattedDateRange
      ? [formattedDateRange[0], formattedDateRange[1]]
      : [addDays(new Date(), -365), addDays(new Date(), 0)];
    defaultDateRange = [addDays(new Date(), -365), addDays(new Date(), 0)];
  }
  const [disabledNavigation, setDisabledNavigation] =
    useState(defaultDateRange);
  const checked = localStorage.eventType ? localStorage.eventType : "Текущие";
  const [dateRange, setDateRange] = useState(originalDate);
  const [startDate, endDate] = dateRange;
  let datesNum = [Date.parse(startDate), Date.parse(endDate)];
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className="form-settings-header" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Фильтрация мероприятий
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-type-events">
            <p>Вид мероприятий</p>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                onClick={() => {
                  setCurrentTypeOfEvent("Текущие");
                  setDateRange([
                    addDays(new Date(), 0),
                    addDays(new Date(), 183),
                  ]);
                  setDisabledNavigation([
                    addDays(new Date(), 0),
                    addDays(new Date(), 183),
                  ]);
                  document.querySelector(".form-range-events > p").textContent =
                    "Диапазон текущих мероприятий";
                }}
                id="inlineRadio1"
                value="Текущие"
                defaultChecked={checked === "Текущие" ? true : false}
                {...register("eventType")}
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio1">
                Текущие
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                onClick={() => {
                  setCurrentTypeOfEvent("Архив");
                  setDisabledNavigation([
                    addDays(new Date(), -365),
                    addDays(new Date(), 0),
                  ]);
                  setDateRange([
                    addDays(new Date(), -365),
                    addDays(new Date(), 0),
                  ]);
                  document.querySelector(".form-range-events > p").textContent =
                    "Диапазон архивных мероприятий";
                }}
                id="inlineRadio2"
                value="Архив"
                defaultChecked={checked === "Архив" ? true : false}
                {...register("eventType")}
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio2">
                Архив
              </label>
            </div>
          </div>
          <hr></hr>
          <div className="form-range-events">
            <p>
              {currentTypeOfEvent === "Текущие"
                ? "Диапазон текущих мероприятий"
                : "Диапазон архивных мероприятий"}
            </p>
            <div className="form-date-pickers">
              <DatePicker
                selectsRange={true}
                autocomplete="off"
                locale="ru"
                className="event-date w-100"
                style={{ height: "58px" }}
                startDate={startDate}
                endDate={endDate}
                minDate={disabledNavigation[0]}
                maxDate={disabledNavigation[1]}
                onChange={(date) => setDateRange(date)}
                showIcon
                id="datepicker"
                placeholderText="Дата и время мероприятия"
                dateFormat="d MMMM, yyyy г. h:mm"
              />
            <button
              type="button"
              className="btn-default-value btn btn-outline-info"
              onClick={() => {
                console.log(currentTypeOfEvent);
                if (currentTypeOfEvent === "Текущие") {
                  setDateRange([
                    addDays(new Date(), 0),
                    addDays(new Date(), 183),
                  ]);
                } else {
                  setDisabledNavigation([
                    addDays(new Date(), -365),
                    addDays(new Date(), 0),
                  ]);
                }
              }}
              >
              X
            </button>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn btn-dark"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
