import UserApplication from "../../application/UserApplication";
import User from "../../domain/User";
import { Request, Response } from "express";

export class UserController {
  private app: UserApplication;

  constructor(app: UserApplication) {
    this.app = app;
  }

  async registerUser(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    try {
      //validaciones con regex
      const nameRegex: RegExp = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)?$/;
      if (!nameRegex.test(name.trim())) {
        return response.status(400).json({ message: "Nombre Invalido" });
      }
      if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email))
        return response.status(400).json({ error: "Correo electrónico no válido" });

      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,25}$/.test(password))
        return response.status(400).json({
          error:
            "La contraseña debe tener al menos 6 caracteres y máximo 25, incluyendo al menos una letra y un número",
        });
      const status = 1;
      const user: Omit<User, "id"> = {
        name, email, password, status
      };
      const userId = await this.app.createUser(user);
      return response
        .status(201)
        .json(userId.toString());
    } catch (e) {
      if (e instanceof Error) {
        return response
          .status(500)
          .json({ message: "error en servidor" });
      }
    }
    return response.status(400).json({ message: "Error en la peticion" });
  }

  async searchUserById(req: Request, res: Response): Promise<Response> {
    try {
      const userId: number = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res
          .status(400)
          .json({ message: "no se mando un id correcto" });
      }
      const user = await this.app.getUserById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ message: "Usuario no encontrado" });
      }
      return res
        .status(200)
        .json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json({ message: "Error en el servidor" });
      }
    }
    return res.status(400).json({ message: "Error en la peticion" });
  }

  async searchUserByEmail(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = (req.params);
      if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email))
        return res.status(400).json({ error: "Correo electrónico no válido" });
      const user = await this.app.getUserByEmail(email);
      if (!user) {
        return res
          .status(404)
          .json({ message: "Usuario no encontrado" });
      }
      return res
        .status(200)
        .json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json({ message: "Error en el servidor" });
      }
    }
    return res.status(400).json({ message: "Error en la peticion" });
  }

  async allUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users: Array<User> = await this.app.getAllUsers();

      if (!users) {
        return res
          .status(404)
          .json({ message: "No se encontraron usuarios" });
      }
      return res
        .status(200)
        .json(users);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500)
          .json({ message: "Error en el servidor" })
      }
      return res.status(400).json({ message: "Error en la peticion" });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId: number = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res
          .status(400)
          .json({ message: "no se mando un id correcto" });
      }
      const user = await this.app.deleteUser(userId);
      if (!user) {
        return res
          .status(404)
          .json({ message: "Usuario no encontrado" });
      }
      return res
        .status(204);
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json({ message: "Error en el servidor" });
      }
    }
    return res.status(400).json({ message: "Error en la peticion" });
  }

  async updataUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId: number = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res
          .status(400)
          .json({ message: "no se mando un id correcto" });
      }

      let { name, email, password, status } = req.body;

      if (name && !/^[a-zA-Z\s]{3,}$/.test(name.trim()))
        return res
          .status(400)
          .json({
            error:
              "El nombre debe tener al menos 3 caracteres y solo contener letras",
          });

      if (email && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email.trim()))
        return res.status(400).json({ error: "Correo electrónico no válido" });

      if (password && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password.trim()))
        return res
          .status(400)
          .json({
            error:
              "La contraseña debe tener al menos 6 caracteres, incluyendo al menos una letra y un número",
          });

      status = 1;
      const updated = await this.app.updateUser(userId, {
        name,
        email,
        password,
        status
      });

      if (!updated) return res.status(400).json({ message: "usuario no encontrado o sin cambios" });

      return res.status(200);
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json({ message: "Error en el servidor" });
      }
    }
    return res.status(400).json({ message: "Error en la peticion" });
  }
}