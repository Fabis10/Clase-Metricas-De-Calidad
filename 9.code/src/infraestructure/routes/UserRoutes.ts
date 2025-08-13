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
