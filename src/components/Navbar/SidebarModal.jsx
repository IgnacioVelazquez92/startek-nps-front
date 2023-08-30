import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Login from "./Login";

function SidemarModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div>
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none "
        >
          <button
            className="btn text-light my-auto border-0 d-flex align-items-center justify-content-evenly"
            onClick={handleShow}
          >
            <i className="bi bi-person-circle rounded-circle me-2 my-auto h3"></i>
            <strong className="text-light d-none d-md-block">Login</strong>
          </button>
        </a>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bienvenido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login setShow={setShow} />
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <div className="text-secondary">
            &copy; 2023 Hecho por Ignacio Velazquez
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SidemarModal;
