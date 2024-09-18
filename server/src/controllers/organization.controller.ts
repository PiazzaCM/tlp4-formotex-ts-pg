import { Request, Response } from "express";
import OrganizationService from "../services/organization.service";

class OrganizationController {
  async create(req: Request, res: Response) {
    
    try {
      const organization = await OrganizationService.create(req.body);
      res.status(201).json(organization);
    } catch (error) {
      res.status(400).json({ message: error});
    }
  }

  async getAll(req: Request, res: Response) {

    try {
      const organizations = await OrganizationService.getAll();
      res.status(200).json(organizations);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async getById(req: Request, res: Response) {

    try {
      const organization = await OrganizationService.getById(req.params.id);
      res.status(200).json(organization);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async update(req: Request, res: Response) {

    try {
      const organization = await OrganizationService.update(req.params.id, req.body);
      res.status(200).json(organization[1][0]);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async delete(req: Request, res: Response) {

    try {
      await OrganizationService.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}

export default new OrganizationController();



