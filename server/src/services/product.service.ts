import { Product } from "../interfaces/product.interface";
import { OrganizacionModel } from "../models/organization.model";
import { ProductosModel } from "../models/product.model";

class ProductService {
  async create(product: Product, id_organizacion: number) {

    return await ProductosModel.create({...product, id_organizacion});
  }

  async getPorOrganizacion(id_organizacion: number) {
    return await ProductosModel.findAll({
      where: {
        id_organizacion
      }});
  }

  async getAll() {
    return await ProductosModel.findAll({include: [OrganizacionModel]});
  }


  async getById(id: string) {
    return await ProductosModel.findByPk(id, {include: [OrganizacionModel]});
  }

  async update(id: string, product: Product) {
    return await ProductosModel.update(product, {
      where: {
        id_producto: id
      }, returning: true
    });
  }

  async delete(id: string) {
    return await ProductosModel.destroy({where: {
      id_producto: id
    }});
  }
}  

export default new ProductService();