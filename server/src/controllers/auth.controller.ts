import { Request, Response } from "express";
import authService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  const { username, email, password, id_rol } = req.body;

  try {
    const hashedPassword = await authService.hashPassword(password);

    const user = await authService.register({ username, email, password: hashedPassword, id_rol });

    return res.json({
      ...user.dataValues,
      password: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);

    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al iniciar sesión" });
  }
};


export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id_usuario, 10); // Convierte el id_usuario a número

    if (isNaN(userId)) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }

    const user = await authService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al obtener usuario" });
  }
};

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await authService.getEmployeesByRole(2); // Obtén empleados con rol 2
    return res.json(employees);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener empleados' });
  }
};


export const updateEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const employeeData = req.body;
  try {
    const updatedEmployee = await authService.updateEmployee(parseInt(id), employeeData);
    if (updatedEmployee) {
      return res.json(updatedEmployee);
    } else {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar empleado' });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await authService.deleteEmployee(parseInt(id));
    if (deleted) {
      return res.json({ message: 'Empleado eliminado con éxito' });
    } else {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al eliminar empleado' });
  }
};
