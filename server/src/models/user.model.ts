import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/connection';
import { User } from '../interfaces/user.interface';

class UserModel extends Model<User> {
    public declare id_usuario: number;
    public declare username: string;
    public declare email: string;
    public declare password: string;
    public declare id_rol: number;
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
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_rol: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'usuarios'
});

export { UserModel };
