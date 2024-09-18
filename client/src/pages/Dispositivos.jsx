import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import CreateProductForm from "../components/PostProduct";
import Sidebar from '../components/Sidebar';
import { Toast } from "../components/Toast";
import '../components/css/Dispositivos.css';
import { UserContext } from "../context/UserContext";
import UpdateProductForm from '../components/UpdateProduct';

const Dispositivos = () => {
  const { userState: { token } } = useContext(UserContext);

  const [equipamiento, setEquipamiento] = useState([]);

  const fetchEquipamiento = async () => {
    const response = await fetch(`http://localhost:3000/api/products`,
      {
        headers: { token },
      }
    );

    const data = await response.json();

    if(response.ok){
      setEquipamiento(data);
    } else {
      console.log('Error al obtener el equipamiento');
    }
  };

  const deleteEquipamiento = async (id) => {
    const response = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'DELETE',
      headers: { token }
    });

    if(response.ok){
      Toast.fire({
        icon: 'success',
        title: 'Equipamiento eliminado correctamente'
      });
      setEquipamiento(equipamiento.filter(equip => equip.id_producto !== id));
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Error al eliminar el equipamiento'
      });
    }
  }

  useEffect(() => {
    fetchEquipamiento();
  }, []);

  return (
    <Sidebar>
      <div className="dispositivos">
        <div className="dispositivos-header">
          <h1>Dispositivos Informáticos</h1>
       
        </div>

        <div className="dispositivos-container">
          <div className="dispositivos-table">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Estado</th>
                  <th>Stock Disponible</th>
                  <th>Adquirido el</th>
                  <th>Organizacion</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>

                {equipamiento.map( (equipamiento) => (
                  <tr>
                    <td>{equipamiento.name}</td>
                    <td>{equipamiento.status}</td>
                    <td>{equipamiento.availableStock}</td>
                    <td>{new Date(equipamiento.adquisitionDay).toLocaleDateString('es')}</td>
                    <td>{equipamiento.OrganizacionModel.name}</td>
                    <td>
                      <button button className="btn btn-secondary"><UpdateProductForm {...{equipamiento, setEquipamiento}}/></button>
                      <button className="btn btn-danger" onClick={()=>deleteEquipamiento(equipamiento.id_producto)}>Eliminar</button>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Dispositivos;
