import { Organization } from "../interfaces/organization.interface";
import { OrganizacionModel } from "../models/organization.model";
import { ProductosModel } from "../models/product.model";

class OrganizationService {
  async create(organization: Organization, id_usuario: number) {
    return await OrganizacionModel.create({...organization, id_usuario});
  }

  async getAll(id_usuario: number) {
    return await OrganizacionModel.findAll({
      where: {
        id_usuario
      }, include: [{model: ProductosModel}]
    });
  }

  async getById(id_organizacion: string, id_usuario: number) {
    return await OrganizacionModel.findOne({
      where: {
        id_usuario,
        id_organizacion,
      },
      include: [ProductosModel]
    });
  }

  async update(id_organizacion: string, organization: Organization, id_usuario: number) {
    return await OrganizacionModel.update(organization, {
      where: {
        id_usuario,
        id_organizacion,
      }, returning: true
    });
  }
 
  async delete(id_organizacion: string, id_usuario: number) {
    return await OrganizacionModel.destroy({where: {
      id_usuario,
      id_organizacion,
    }});
  }
}

export default new OrganizationService();