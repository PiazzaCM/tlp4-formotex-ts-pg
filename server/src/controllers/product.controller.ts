import { Response, Request } from 'express';
import productService from '../services/product.service';

class ProductController {
  async create(req: Request, res: Response) {

    const { id_organizacion } = req.params;

    if(!id_organizacion) return res.status(400).json({
      msg: 'El id de la organización es obligatorio'
    })

    try {
      const product = await productService.create(req.body, parseInt(id_organizacion));
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async getAll(req: Request, res: Response) {

    try {
      const products = await productService.getAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json(error);
    }
  }
 
  async getAllPorOrganizacion(req: Request, res: Response) {

    const { id_organizacion } = req.params;

    try {
      const products = await productService.getPorOrganizacion(parseInt(id_organizacion));
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const product = await productService.getById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const product = await productService.update(req.params.id, req.body);
      const productUpdated = await productService.getById(req.params.id);
      res.status(200).json(productUpdated);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const product = await productService.delete(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

export default new ProductController();