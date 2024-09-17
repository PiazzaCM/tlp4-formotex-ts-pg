import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../components/css/Empleados.css';
import PostEmpleados from '../components/PostEmpleados'; 

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/employees');
        if (response.ok) {
          const data = await response.json();
          setEmpleados(data);
        } else {
          console.error('Error al obtener empleados');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchEmpleados();
  }, []);

  return (
    <Sidebar>
      <div className='empleados' id='empleados'>
        <div className='empleados-header'>
          <h1>Empleados</h1>
          <button className='btn btn-primary'><PostEmpleados /></button>
        </div>

        <div className='empleados-container'>
          <div className='empleados-table'>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo Electrónico</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {empleados.length > 0 ? (
                  empleados.map((empleado) => (
                    <tr key={empleado.id_usuario}>
                      <td>{empleado.username}</td>
                      <td>{empleado.email}</td>
                      <td>
                        <button className='btn btn-secondary'>Editar</button>
                        <button className='btn btn-danger'>Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No hay empleados disponibles</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Empleados;