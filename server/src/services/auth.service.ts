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

  async login(username: string, password: string) {
    const user = await UserModel.findOne({ where: {username} });

    if (!user) throw new Error("Usuario no encontrado");

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new Error("Contraseña incorrecta");

    return await generarJWT({ uid: user.id_usuario });
  }
}

export default new AuthService();
