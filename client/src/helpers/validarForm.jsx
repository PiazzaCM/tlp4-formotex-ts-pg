import { Toast } from "../components/Toast";

export const validarForm = (form) => {
  if (form.username.trim() === "") {
    Toast.fire({
      icon: "error",
      title: "Ingrese un nombre",
    });
    return false;
  }

  if (form.email.trim() === "") {
    Toast.fire({
      icon: "error",
      title: "Ingrese un correo",
    });
    return false;
  }

  if (form.password.trim() === "") {
    Toast.fire({
      icon: "error",
      title: "Ingrese una contraseña",
    });
    return false;
  }

  return true;
};