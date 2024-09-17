import { Router } from "express";
import { login, register, getUserById, getEmployees } from "../controllers/auth.controller";

const AuthRouter = Router();

AuthRouter.post("/register", register);

AuthRouter.get("/employees/", getEmployees);

AuthRouter.post("/login", login);

export { AuthRouter };
