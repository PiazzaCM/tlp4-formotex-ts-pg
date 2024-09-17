import { Sequelize } from 'sequelize'
import { URI } from '../config/conf';

export const sequelize = new Sequelize(URI)

export async function connectDB () {
  await sequelize.sync({force: false});

  console.log('BD conectada'); 
}