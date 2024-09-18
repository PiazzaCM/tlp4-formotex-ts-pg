import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/connection';
import { Organization } from '../interfaces/organization.interface';
import { ProductosModel } from './product.model';

class OrganizacionModel extends Model<Organization> {
    public declare id_organizacion: number;
    public declare name: string;
}

OrganizacionModel.init({
    id_organizacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'organizaciones'
});


OrganizacionModel.hasMany(ProductosModel, {
    foreignKey: 'id_organizacion',
})

ProductosModel.belongsTo(OrganizacionModel, {
    foreignKey: 'id_organizacion',
})


export { OrganizacionModel };

