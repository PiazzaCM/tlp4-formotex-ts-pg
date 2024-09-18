import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Toast } from "./Toast";
import LoadingButton from "./LoadingButtom";  
import { UserContext } from "../context/UserContext";

function UpdateOrganizationForm({org, setOrganizations}) {

  const { userState: { token } } = useContext(UserContext);

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(org);

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
      const response = await fetch(`http://localhost:3000/api/organizations/${org.id_organizacion}` , {
        method: "PUT",
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
          title: 'Organización actualizada con éxito'
        });
        setOrganizations(prevOrgs => prevOrgs.map(org => org.id_organizacion === payload.id_organizacion ? payload : org));
        handleClose();
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Error al actualizar organización'
        });
      }
    } catch (err) {
      console.log(err)
      Toast.fire({
        icon: 'error',
        title: 'Error al actualizar organización'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <a className="nav-link" onClick={handleShow}>
        Editar
      </a>

      <Modal dialogClassName="modal-xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Organización</Modal.Title>
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
            {loading ? <LoadingButton /> : "Actualizar Organización"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateOrganizationForm;
