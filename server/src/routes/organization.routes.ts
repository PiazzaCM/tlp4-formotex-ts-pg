import { Router } from "express";

import OrganizationController from "../controllers/organization.controller";
import { validarJWT } from "../middlewares/validarJWT";

const OrganizationRouter = Router();

OrganizationRouter.post("/organization", validarJWT, OrganizationController.create);

OrganizationRouter.get("/organization", validarJWT, OrganizationController.getAll);

OrganizationRouter.get("/organization/:id", validarJWT, OrganizationController.getById);

OrganizationRouter.put("/organization/:id", validarJWT, OrganizationController.update);

OrganizationRouter.delete("/organization/:id", validarJWT, OrganizationController.delete);

export { OrganizationRouter };
