import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/css/Login.css";
import { UserContext } from "../context/UserContext";
import { userTypes } from "../context/userTypes";

const Login = () => {

  const { userDispatch } = useContext(UserContext);

  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    
    if (!form.email || !form.password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      setLoading(false);

      if (response.ok) {
        userDispatch({
          type: userTypes.login,
          payload: data,
        })
        alert("Inicio de sesión exitoso.");
        navigate("/dispositivos");
      } else {
        alert(data.message || "Error al iniciar sesión.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error en la solicitud:", error);
      alert("Ocurrió un error. Intenta de nuevo más tarde.");
    }
  };

  return (
    <div>
      <div className="login-container">
        <div className="left-section">
          <div className="content">
            <img
              src="/img/organization.png"
              alt="icon"
              className="icon"
            />
          </div>
        </div>
        <div className="right-section">
          <div className="overlay">
            <form className="login-form" onSubmit={loginUser}>
              <h2>Iniciar Sesión</h2>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Ingresa tu correo"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Ingresa tu contraseña"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {loading ? "Cargando..." : "Iniciar Sesión"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
