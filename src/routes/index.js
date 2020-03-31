import { Router } from 'express';
import todoRoutes from './todo.route';
import userRoutes from "./user.route";

const routes = Router();

routes.use('/todo',todoRoutes);
routes.use('/user',userRoutes);

export default routes;