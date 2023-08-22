import { useState } from "react";
import Button from "react-bootstrap/Button";
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
          <img
            src="https://avatars.githubusercontent.com/u/69434969?v=4"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <button className="btn text-light" onClick={handleShow}>
            <strong>Admin</strong>
          </button>
        </a>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bienvenido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login />
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
