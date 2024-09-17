const createEmployee = async () => {
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
        handleClose(); // Close the modal here
      } else {
        // Handle error response if necessary
        Toast.fire({
          icon: 'error',
          title: 'Error al crear el empleado'
        });
      }
    } catch (error) {
      console.error('Error al crear el empleado:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al crear el empleado'
      });
    } finally {
      setLoading(false);
    }
  };
  