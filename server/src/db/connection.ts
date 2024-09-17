import { Sequelize } from 'sequelize'
import { URI } from '../config/conf';

export const sequelize = new Sequelize(URI);

export async function connectDB() {
  try {
    await sequelize.sync({ force: false });
    

    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}