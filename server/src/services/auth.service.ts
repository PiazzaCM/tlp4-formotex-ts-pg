import { generarJWT } from "../helpers/generarJWT";
import { User } from "../interfaces/user.interface";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model";
import { RolModel } from "../models/role.model";
RolModel.sync()

class AuthService {
  async register(user: User) {
    return await UserModel.create(user);
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ where: {email} });

    if (!user) throw new Error("Usuario no encontrado");

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new Error("Contraseña incorrecta");

    return await generarJWT({ uid: user.id_usuario });
  }

  async getUserById(id_usuario: number) {
    return await UserModel.findOne({ where: { id_usuario } });
  }

  async updateEmployee(id_usuario: number, employeeData: any) {
    const employee = await UserModel.findOne({ where: { id_usuario } });
    if (employee) {
      return await employee.update(employeeData);
    }
    return null;
  }

  async deleteEmployee(id_usuario: number) {
    const employee = await UserModel.findOne({ where: { id_usuario } });
    if (employee) {
      return await employee.destroy();
    }
    return false;
  }

  async getEmployeesByRole(roleId: number) {
    return await UserModel.findAll({
      attributes: ['username', 'email'],
      where: {
        id_rol: roleId
      }
    });
  }
}

export default new AuthService();
