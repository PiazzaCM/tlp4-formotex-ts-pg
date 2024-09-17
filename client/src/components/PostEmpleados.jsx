import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Toast } from './Toast';
import { UserContext } from '../context/UserContext';

const PostEmpleados = () => {
  const { userState: { token }, setEmployees, socket } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",  
    email: "",
    password: "",
    id_rol: "" 
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { target } = e;
    const { value, name } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const peticion = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
          token,
        },
      });
      const payload = await peticion.json();

      if (peticion.ok) {
        Toast.fire({
          icon: 'success',
          title: 'Empleado creado con éxito'
        });
        setEmployees(valorPrevio => [...valorPrevio, payload]);
        socket.emit('employees', payload);
        handleClose();
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Error al crear empleado'
        });
      }
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: 'Error al crear empleado'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Crear Empleado
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Nombre de usuario:</Form.Label> 
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del empleado"
                value={form.username}
                onChange={handleChange}
                name="username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese el email del empleado"
                value={form.email}
                onChange={handleChange}
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese la contraseña del empleado"
                value={form.password}
                onChange={handleChange}
                name="password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="id_rol">
              <Form.Label>Rol:</Form.Label>
              <Form.Control
                as="select"
                value={form.id_rol}
                onChange={handleChange}
                name="id_rol" 
              >
                <option value="1">Admin</option>
                <option value="2">Empleado</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Cargando...' : 'Crear Empleado'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostEmpleados;
