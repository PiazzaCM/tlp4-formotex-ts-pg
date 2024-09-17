import { Request, Response } from "express";
import OrganizationService from "../services/organization.service";

class OrganizationController {
  async create(req: Request, res: Response) {

    //@ts-ignore
    const { id_usuario } = req.user;

    try {
      const organization = await OrganizationService.create(req.body, id_usuario);
      res.status(201).json(organization);
    } catch (error) {
      res.status(400).json({ message: error});
    }
  }

  async getAll(req: Request, res: Response) {

    //@ts-ignore
    const { id_usuario } = req.user;

    try {
      const organizations = await OrganizationService.getAll(id_usuario);
      res.status(200).json(organizations);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async getById(req: Request, res: Response) {

    //@ts-ignore
    const { id_usuario } = req.user;

    try {
      const organization = await OrganizationService.getById(req.params.id, id_usuario);
      res.status(200).json(organization);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async update(req: Request, res: Response) {

    //@ts-ignore
    const { id_usuario } = req.user;

    try {
      const organization = await OrganizationService.update(req.params.id, req.body, id_usuario);
      res.status(200).json(organization);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async delete(req: Request, res: Response) {

    //@ts-ignore
    const { id_usuario } = req.user;

    try {
      await OrganizationService.delete(req.params.id, id_usuario);
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}

export default new OrganizationController();



