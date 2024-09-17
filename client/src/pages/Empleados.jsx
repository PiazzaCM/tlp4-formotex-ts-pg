import React from 'react';
import Sidebar from '../components/Sidebar';
import '../components/css/Empleados.css';

const Empleados = () => {
  return (
    <Sidebar>
      <div className='empleados' id='empleados'>
        <div className='empleados-header'>
          <h1>Empleados</h1>
          <button className='btn btn-primary'>Agregar Empleado</button>
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
                <tr>
                  <td>Empleado 1</td>
                  <td>empleado1@gmail.com</td>
                  <td>
                    <button className='btn btn-secondary'>Editar</button>
                    <button className='btn btn-danger'>Eliminar</button>
                  </td>
                </tr>
                <tr>
                  <td>Empleado 2</td>
                  <td>empleado2@gmail.com</td>
                  <td>
                    <button className='btn btn-secondary'>Editar</button>
                    <button className='btn btn-danger'>Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Empleados;
