import React from 'react';
import Sidebar from '../components/Sidebar';
import '../components/css/Dispositivos.css';

const Dispositivos = () => {
  return (
    <Sidebar>
      <div className='dispositivos'>
        <div className='dispositivos-header'>
          <h1>Dispositivos Informáticos</h1>
          <button className='btn btn-primary'>Agregar Dispositivo</button>
        </div>

        <div className='dispositivos-container'>
          <div className='dispositivos-table'>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Stock Disponible</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Laptop Dell</td>
                  <td>12</td>
                  <td>
                    <button className='btn btn-secondary'>Editar</button>
                    <button className='btn btn-success'>Asignar</button>
                    <button className='btn btn-danger'>Eliminar</button>
                  </td>
                </tr>
                <tr>
                  <td>Monitor Samsung</td>
                  <td>8</td>
                  <td>
                    <button className='btn btn-secondary'>Editar</button>
                    <button className='btn btn-success'>Asignar</button>
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

export default Dispositivos;
