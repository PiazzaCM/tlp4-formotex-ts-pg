import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/connection';
import { User } from '../interfaces/user.interface';
import { OrganizacionModel } from './organization.model';

class UserModel extends Model<User> {
    public declare id_usuario: number;
    public declare username: string;
    public declare email: string;
    public declare password: string;
}

UserModel.init({
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'usuarios'
});

UserModel.hasMany(OrganizacionModel, {
    foreignKey: 'id_usuario',
})

OrganizacionModel.belongsTo(UserModel, {
    foreignKey: 'id_usuario',
})

export { UserModel };
