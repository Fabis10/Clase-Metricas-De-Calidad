import { Repository } from "typeorm";
import User from '../../domain/User';
import UserPort from "../../domain/UserPort";
import UserEntity from "../entities/UserEntity";
import { AppDataSource } from "../config/con_data_base";


export default class UserAdapter implements UserPort {

  private userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
  }

  private toDomain(user: UserEntity): User {
    const userDomain: User = {
      id: user.id_user,
      name: user.name_user,
      email: user.email_user,
      password: user.password_user,
      status: user.status_user
    };
    return userDomain;
  }

  private toEntity(user: Omit<User, "id_user">): UserEntity {
    const userEntity: UserEntity = new UserEntity();

    userEntity.name_user = user.name;
    userEntity.email_user = user.email;
    userEntity.password_user = user.password;
    userEntity.status_user = user.status;

    return userEntity;
  }

  async createUser(user: Omit<User, "id_user">): Promise<number> {
    try {
      const newUser = this.toEntity(user);
      const savedUser = await this.userRepository.save(newUser);
      return savedUser.id_user;
    } catch (error) {
      console.error(error);
      throw new Error("No se pudo crear el usuario");
    }
  }

  async updateUser(id: number, user: Partial<User>): Promise<boolean> {
    try {
      const existingUser = await this.userRepository.findOne({ where: { id_user: id } });
      if (!existingUser) {
        throw new Error("User not found");
      }
      //Usas la validacion de nulos para no tener varios if validando cada uno, si no llega a existir data, va a  poner la data que ya existia en la base de datos
      Object.assign(existingUser, {
        name_user: user.name ?? user.name,
        email_user: user.email ?? user.email,
        password_user: user.password ?? user.password,
        status_user: 1
      });
      await this.userRepository.save(existingUser);
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("No se pudo crear el usuario");
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      const existingUser = await this.userRepository.findOne({ where: { id_user: id } });
      if (!existingUser) {
        throw new Error("No existe el usuario");
      }
      Object.assign(existingUser, {
        status_user: 0,
      }
      );
      await this.userRepository.save(existingUser);
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("No se pudo crear el usuario");
    }
  }

  async getAllUsers(): Promise<Array<User>> {
    try {
      const users = await this.userRepository.find();
      return users.map(this.toDomain);
    } catch (error) {
      console.error(error);
      throw new Error("No se pudo crear el usuario");
    }
  }

  async getUserById(id: number): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({ where: { id_user: id } });
      return user ? this.toDomain(user) : null;
    } catch (error) {

      console.error(error);
      throw new Error("No se pudo crear el usuario");
    }
  }

  async getUserByEmail(id: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({ where: { email_user: id } });
      return user ? this.toDomain(user) : null;
    } catch (error) {

      console.error(error);
      throw new Error("No se pudo crear el usuario");
    }
  }

}