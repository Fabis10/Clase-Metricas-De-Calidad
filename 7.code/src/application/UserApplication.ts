import User from "../domain/User";
import UserPort from "../domain/UserPort";

export default class UserApplication {

  private port: UserPort;

  constructor(port: UserPort) {
    this.port = port;
  }

  async createUser(user: Omit<User, "id">): Promise<number> {
    const existingUser = await this.port.getUserByEmail(user.email);

    if (!existingUser) {
      return await this.port.createUser(user);
    }
    throw new Error("El usuario ya existe");
  }

  async updateUser(id: number, user: Partial<User>): Promise<boolean> {
    const existingUser = await this.port.getUserById(id);

    if (!existingUser) {
      throw new Error("El usuario no existe");
    }
    if (user.email) {
      const emailTaken = await this.port.getUserByEmail(user.email);
      if (emailTaken && emailTaken.id !== id) {
        throw new Error("No se puede cambiar el correo porque alguien ya lo esta usando");
      }
    }
    return await this.port.updateUser(id, user);
  }

  async deleteUser(id: number): Promise<boolean> {
    const existingUser = await this.port.getUserById(id);

    if (!existingUser) {
      throw new Error("dsfsdf");
    }

    return await this.port.deleteUser(id);
  }
}