import { Product } from "../interfaces/product.interface";
import { OrganizacionModel } from "../models/organization.model";
import { ProductosModel } from "../models/product.model";

class ProductService {
  async create(product: Product, id_organizacion: number) {

    console.log({...product, id_organizacion})
    return await ProductosModel.create({...product, id_organizacion});
  }

  async getAll(id_usuario: number) {
    return await ProductosModel.findAll({include: [{
      model: OrganizacionModel,
      where: {
        id_usuario
      }
    }]});
  }

  async getById(id: string) {
    return await ProductosModel.findByPk(id);
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