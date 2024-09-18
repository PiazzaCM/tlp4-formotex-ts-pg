import { Router } from "express";
import { login, register, getUserById, getEmployees, updateEmployee, deleteEmployee  } from "../controllers/auth.controller";

const AuthRouter = Router();

AuthRouter.post("/register", register);

AuthRouter.get("/employees/", getEmployees);

AuthRouter.put('/employees/:id', updateEmployee);

AuthRouter.delete('/employees/:id', deleteEmployee);

AuthRouter.post("/login", login);

export { AuthRouter };
