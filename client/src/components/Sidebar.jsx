import React, { useState } from 'react'
import './css/sidebar.css'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom'; 




 const Sidebar = ({children}) => {
    const navigate = useNavigate();   
    const [isOpen, setIsOpen] = useState(true);
    const path = useLocation().pathname;

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
      };

      const logOut = () => {
        userDispatch({
          type: userTypes.logout,
        });
    
        navigate('/');
      };
    

    return (
        <div id="app">
          <div className={`sidebar ${isOpen ? 'open' : 'hide'}`}>
            <div className="items">
              <div className='header'>
                <div>
                  <img src="/img/store.webp" height={'50px'}  />
                </div>
                <div className='title'>
                  <h2>FMTX</h2>
                </div>
              </div>

              <hr className='hr-header' />
              <ul>
                <li className={path === '/organizaciones' ? 'active' : ''} onClick={() => navigate('/organizaciones')}>
                  <i className="bi bi-building"></i>
                  <span className='tittle'>comercios</span>
                </li>
                <li className={path === '/dispositivos' ? 'active' : ''} onClick={() => navigate('/dispositivos')}>
                  <i className="bi bi-box-seam"></i>
                  <span className='tittle'>dispositivos</span>
                </li>
                <li className={path === '/empleados' ? 'active' : ''} onClick={() => navigate('/empleados')}>
                  <i className="bi bi-person"></i>
                  <span className='tittle'>empleados</span>
                </li>
                <li className={path === '/estados' ? 'active' : ''} onClick={() => navigate('/estados')}>
                  <i className="bi bi-bar-chart"></i>
                  <span className='tittle'>estado</span>
                </li>

              </ul>
            </div>
            <ul className='profile-item'>
              <li onClick={() => logOut()}>
                <i className="bi bi-box-arrow-left"></i>
                <span className="tittle"    >Cerrar sesion</span>
              </li>
            </ul>
          </div>
    
          {/* Contenido principal */}
          <div className="main-content">
            <div className="app-container">
              <br />
              
              {children}
    
            </div>
          </div>
        </div>
      );
}

export default Sidebar;