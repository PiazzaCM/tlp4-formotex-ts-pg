import { Router } from "express";

import OrganizationController from "../controllers/organization.controller";
import { validarJWT } from "../middlewares/validarJWT";

const OrganizationRouter = Router();

OrganizationRouter.post("/organizations", validarJWT, OrganizationController.create);

OrganizationRouter.get("/organizations", validarJWT, OrganizationController.getAll);

OrganizationRouter.get("/organizations/:id", validarJWT, OrganizationController.getById);

OrganizationRouter.put("/organizations/:id", validarJWT, OrganizationController.update);

OrganizationRouter.delete("/organizations/:id", validarJWT, OrganizationController.delete);

export { OrganizationRouter };
