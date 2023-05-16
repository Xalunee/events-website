import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function ModalSettings(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    localStorage.eventType = data.eventType;
    props.onHide();
  };
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Фильтрация мероприятий
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <p className="form-show-events">Отображать мероприятия</p>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="Текущие"
              defaultChecked
              {...register('eventType')}
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
              id="inlineRadio2"
              value="Архив"
              {...register('eventType')}
            ></input>
            <label className="form-check-label" htmlFor="inlineRadio2">
              Архив
            </label>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-dark" type="submit" onClick={handleSubmit(onSubmit)}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
