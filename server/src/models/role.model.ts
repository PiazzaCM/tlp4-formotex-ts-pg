import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/connection';
import { Role } from '../interfaces/role.interface';
import { UserModel } from './user.model';

class RolModel extends Model<Role> {
    public declare id_rol: number;
    public declare name: string;
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
})

UserModel.belongsTo(RolModel, {
    foreignKey: 'id_rol',
})

export { RolModel };

