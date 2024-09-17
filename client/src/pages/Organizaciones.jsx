import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import '../components/css/Organizaciones.css';
import CreateOrganizationForm from '../components/PostOrganizacion';
import { UserContext } from '../context/UserContext';

const Organizaciones = () => {
  const { userState: { token } } = useContext(UserContext);

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/organizations', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        setOrganizations(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching organizations:", error);
        setLoading(false);
      }
    };
  
    fetchOrganizations();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/organizations/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setOrganizations(prevOrgs => prevOrgs.filter(org => org.id !== id));
      }
    } catch (error) {
      console.error("Error al borrar la organizacion:", error);
    }
  };

  return (
    <Sidebar>
      <div className='organizaciones'>
        <div className='organizaciones-header'>
          <h1>Organizaciones</h1>
          <button className='btn btn-primary'><CreateOrganizationForm /></button>
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
                {loading ? (
                  <tr>
                    <td colSpan="3">Cargando organizaciones...</td>
                  </tr>
                ) : (
                  organizations.length > 0 ? (
                    organizations.map((org) => (
                      <tr key={org.id}>
                        <td>{org.name}</td>
                        <td>{org.email}</td>
                        <td>
                          <button className='btn btn-secondary'>Editar</button>
                          <button className='btn btn-success'>Asignar Equipamiento</button>
                          <button 
                            className='btn btn-danger' 
                            onClick={() => handleDelete(org.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No hay organizaciones registradas.</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Organizaciones;
