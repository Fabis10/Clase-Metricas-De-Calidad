import { Router } from "express";
import UserAdapter from "../adapter/UserAdapter";
import UserApplication from "../../application/UserApplication";
import { UserController } from '../controller/UserController';

//Express
const router = Router();
//Inicializacion de capas
const userAdapter = new UserAdapter();
const userApp = new UserApplication(userAdapter);
const userController = new UserController(userApp);
//Definicion de rutas o endopoints
router.post("/users", async (request, response) => {
  try {
    await userController.registerUser(request, response);
  } catch (error) {
    console.error("Error en usuario: ", error);
    response.status(400).json({ message: "Error en la creacion del usuario" });
  }
});

router.get("/users", async (req, res) => {
  try {
    await userController.allUsers(req, res);
  } catch (error) {
    console.error("Error al traer los usuarios");
    res.status(400)
      .json({
        message: "Error al traer los usuarios"
      })
  }
})

export default router;