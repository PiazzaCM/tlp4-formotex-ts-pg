import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/connection';
import { Product } from '../interfaces/product.interface';

class ProductosModel extends Model<Product> {
    public declare id_organizacion: number;
    public declare name: string;
    public declare status: string;
    public declare stock: string;
    public declare adquisitionDay: string;
    public declare availableStock: number;
}

ProductosModel.init({
    id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    adquisitionDay: {
        type: DataTypes.DATE,
        allowNull: false
    },
    availableStock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize,
    tableName: 'productos'
});


export { ProductosModel };

