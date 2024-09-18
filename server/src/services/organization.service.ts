import { Organization } from "../interfaces/organization.interface";
import { OrganizacionModel } from "../models/organization.model";
import { ProductosModel } from "../models/product.model";

class OrganizationService {
  async create(organization: Organization) {
    return await OrganizacionModel.create({...organization});
  }

  async getAll() {
    return await OrganizacionModel.findAll({
      where: {
      }, include: [ProductosModel]
    });
  }

  async getById(id_organizacion: string) {
    return await OrganizacionModel.findOne({
      where: {
        id_organizacion,
      },
      include: [ProductosModel]
    });
  }

  async update(id_organizacion: string, organization: Organization) {
    return await OrganizacionModel.update(organization, {
      where: {
        id_organizacion,
      }, returning: true
    });
  }
 
  async delete(id_organizacion: string) {
    return await OrganizacionModel.destroy({where: {
      id_organizacion,
    }});
  }
}

export default new OrganizationService();