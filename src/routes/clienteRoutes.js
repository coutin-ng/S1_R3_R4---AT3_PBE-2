import { Router } from "express";
import clienteController from "../controllers/clienteController.js";

const clienteRoutes = Router();

clienteRoutes.post('/', clienteController.criarCliente);
clienteRoutes.put('/:id', clienteController.editarCliente);
clienteRoutes.delete('/:id', clienteController.deletarCliente);
clienteRoutes.get('/', clienteController.selecionar);

export default clienteRoutes;