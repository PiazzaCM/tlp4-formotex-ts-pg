import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/connection';
import { Role } from '../interfaces/role.interface';
import { UserModel } from './user.model';

class RolModel extends Model<Role> {
    public declare id_rol: number;
    public declare name: string;

    static async initializeRoles() {
        await RolModel.findOrCreate({ where: { name: 'admin' } });
        await RolModel.findOrCreate({ where: { name: 'empleado' } });
    }
}

RolModel.init({
    id_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    tableName: 'roles'
});

RolModel.hasMany(UserModel, {
    foreignKey: 'id_rol',
});

UserModel.belongsTo(RolModel, {
    foreignKey: 'id_rol',
});


RolModel.initializeRoles().catch(error => console.log('Error al inicializar roles:', error));

export { RolModel };