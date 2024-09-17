import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/connection';
import { Role } from '../interfaces/role.interface';
import { UserModel } from './user.model'; // Importa el modelo de usuarios

class RolModel extends Model<Role> {
    public declare id_rol: number;
    public declare name: string;

    static async initializeRoles() {
        try {
            await RolModel.findOrCreate({ where: { name: 'admin' } });
            await RolModel.findOrCreate({ where: { name: 'empleado' } });
        } catch (error) {
            console.error('Error al inicializar roles:', error);
        }
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
    }
}, {
    sequelize,
    tableName: 'roles'
});

// Relación entre RolModel y UserModel
RolModel.hasMany(UserModel, {
    foreignKey: 'id_rol',
    as: 'usuarios'
});

UserModel.belongsTo(RolModel, {
    foreignKey: 'id_rol',
    as: 'rol'
});

sequelize.sync().then(() => {
    RolModel.initializeRoles().catch(error => console.log('Error al inicializar roles:', error));
});

export { RolModel };
