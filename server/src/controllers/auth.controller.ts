import { Request, Response } from "express";
import authService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await authService.hashPassword(password);

    await authService.register({ username, email, password: hashedPassword });

    return res.json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const token = await authService.login(username, password);

    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
