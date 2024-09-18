import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Toast } from "./Toast";
import LoadingButton from "./LoadingButtom";  
import { UserContext } from "../context/UserContext";

function CreateOrganizationForm() {
  const { userState: { token }, setOrganizations } = useContext(UserContext);

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = ({ target: { name, value } }) => {
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const createOrganization = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/organization", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
          token,
        },
      });
      const payload = await response.json();

      if (response.ok) {
        Toast.fire({
          icon: 'success',
          title: 'Organización creada con éxito'
        });
        setOrganizations(prev => [...prev, payload]);
        handleClose();
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Error al crear organización'
        });
      }
    } catch {
      Toast.fire({
        icon: 'error',
        title: 'Error al crear organización'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <a className="nav-link" onClick={handleShow}>
        Crear Organización
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
