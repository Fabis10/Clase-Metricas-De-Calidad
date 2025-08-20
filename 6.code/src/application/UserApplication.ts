import User from "../domain/User";
import UserPort from "../domain/UserPort";
import AlreadyExistsError from "../infraestructure/shared/errors/AlreadyExistsError";
import DataNotFoundError from "../infraestructure/shared/errors/DataNotFoundError";

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
    throw new AlreadyExistsError("El usuario ya existe");
  }

  async updateUser(id: number, user: Partial<User>): Promise<boolean> {
    const existingUser = await this.port.getUserById(id);

    if (!existingUser) {
      throw new DataNotFoundError("El usuario no existe");
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

  async getUserById(id: number): Promise<User | null> {
    return await this.port.getUserById(id);
  }


  async getUserByEmail(email: string): Promise<User | null> {
    return await this.port.getUserByEmail(email);
  }

  async getAllUsers(): Promise<Array<User>> {
    const users = await this.port.getAllUsers();
    if (users) {
      return users;
    }
    throw new Error("No se encontraron ususarios");
  }
}