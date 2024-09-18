import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Toast } from "./Toast";
import LoadingButton from "./LoadingButtom";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";

function UpdateProductForm({equipamiento, setEquipamiento}) {
  
  const { userState: { token }} = useContext(UserContext);

  const { id } = useParams();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form, setForm] = useState(equipamiento);

  const handleChange = (e) => {
    const { target } = e;
    const { value, name } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const updateProduct = async () => {
    setLoading(true);
    
    const peticion = await fetch(`http://localhost:3000/api/products/${equipamiento.id_producto}`, {
      method: "PUT",
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json',
        token
      }
    });
    setLoading(false);

    const payload = await peticion.json();

    if (peticion.ok) {
      Toast.fire({
        icon: 'success',
        title: 'Producto actualizado con éxito'
      });
      setEquipamiento(prevEquipamiento => prevEquipamiento.map(equipamiento => equipamiento.id_producto === payload.id_producto ? payload : equipamiento));
      return handleClose();
    }
  };

  return (
    <>
      <a className="nav-link" onClick={handleShow}>
        {" "}
        Editar{" "}
      </a>

      <Modal dialogClassName="modal-xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Equipamiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del producto"
                value={form.name}
                onChange={handleChange}
                name="name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Estado:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el estado del producto"
                value={form.status}
                onChange={handleChange}
                name="status"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="stock">
              <Form.Label>Stock:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese el stock del producto"
                value={form.stock}
                onChange={handleChange}
                name="stock"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="availableStock">
              <Form.Label>Stock disponible:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese el stock disponible"
                value={form.availableStock}
                onChange={handleChange}
                name="availableStock"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="adquisitionDay">
              <Form.Label>Dia de adquisicion:</Form.Label>
              <Form.Control
                type="date"
                placeholder="Ingrese la fecha"
                value={form.adquisitionDay}
                onChange={handleChange}
                name="adquisitionDay"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" className="customBtn" variant="primary" onClick={updateProduct}>
            {loading ? <LoadingButton /> : "Actualizar Dispositivo"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateProductForm;
