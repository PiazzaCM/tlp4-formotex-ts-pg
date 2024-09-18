import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import '../components/css/Organizaciones.css';
import CreateOrganizationForm from '../components/PostOrganizacion';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import UpdateOrganizationForm from '../components/UpdateOrganizacion';

const Organizaciones = () => {
  const { userState: { token } } = useContext(UserContext);

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrganizations = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/organizations', {
        headers: {
          token
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

  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/organizations/${id}`, {
        method: 'DELETE',
        headers: {
          token
        }
      });
      if (response.ok) {
        setOrganizations(prevOrgs => prevOrgs.filter(org => org.id_organizacion !== id));
      }
    } catch (error) {
      console.error("Error al borrar la organizacion:", error);
    }
  };
  
  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <Sidebar>
      <div className='organizaciones'>
        <div className='organizaciones-header'>
          <h1>Organizaciones</h1>
          <button className='btn btn-primary'><CreateOrganizationForm {...{setOrganizations}} /></button>
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
                      <tr key={org.id_organizacion}>
                        <td>{org.name}</td>
                        <td>{org.email}</td>
                        <td>
                          <button className='btn btn-secondary'><UpdateOrganizationForm {...{setOrganizations, org}}/></button>
                          <Link role='button' to={`/organizaciones/${org.id_organizacion}`} className='btn btn-success'>Ver Equipamiento</Link>
                          <button 
                            className='btn btn-danger' 
                            onClick={() => handleDelete(org.id_organizacion)}
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
