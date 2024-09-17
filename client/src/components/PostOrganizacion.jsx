import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Toast } from "./Toast";
import LoadingButton from "./LoadingButtom";
import { UserContext } from "../context/UserContext";

function CreateOrganizationForm() {

  const { userState: { token }, setOrganizations, socket } = useContext(UserContext);

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { target } = e;
    const { value, name } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleImage = ({ target }) => {
    setForm({ ...form, image: target.files[0] });
  }

  const createOrganization = async () => {
    setLoading(true);
    const formData = new FormData();

    for (const key in form) {
      formData.append(key, form[key]);
    }

    const peticion = await fetch("http://localhost:3000/api/organization", {
      method: "POST",
      body: formData,
      headers: {
        token
      }
    });
    setLoading(false);

    const payload = await peticion.json();

    if (peticion.ok) {
      Toast.fire({
        icon: 'success',
        title: 'Organización creada con éxito'
      });
      setOrganizations(valorPrevio => [...valorPrevio, payload]);
      socket.emit('organizations', payload);
      return handleClose();
    }
  };

  return (
    <>
      <a className="nav-link" onClick={handleShow}>
        {" "}
        Crear Organización{" "}
      </a>

      <Modal dialogClassName="modal-xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Organización</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre de la organización"
                value={form.name}
                onChange={handleChange}
                name="name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese el email de la organización"
                value={form.email}
                onChange={handleChange}
                name="email"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" className="customBtn" variant="primary" onClick={createOrganization}>
            {loading ? <LoadingButton /> : "Crear Organización"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateOrganizationForm;