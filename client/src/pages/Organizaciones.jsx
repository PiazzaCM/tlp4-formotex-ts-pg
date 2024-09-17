import React from 'react';
import Sidebar from '../components/Sidebar';
import '../components/css/Organizaciones.css';

const Organizaciones = () => {
  return (
    <Sidebar>
      <div className='organizaciones'>
        <div className='organizaciones-header'>
          <h1>Organizaciones</h1>
          <button className='btn btn-primary'>Agregar Organización</button>
        </div>

        <div className='organizaciones-container'>
          <div className='organizaciones-table'>
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
                  <td>Organización 1</td>
                  <td>org1@gmail.com</td>
                  <td>
                    <button className='btn btn-secondary'>Editar</button>
                    <button className='btn btn-danger'>Eliminar</button>
                  </td>
                </tr>
                <tr>
                  <td>Organización 2</td>
                  <td>org2@gmail.com</td>
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

export default Organizaciones;
