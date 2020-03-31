import {Router} from 'express';
import {getAllTodo, addTodo, deleteTodo, updateTodo} from '../controllers/todo.controller';
import { addTodoParamCheck, deleteTodoParamCheck, updateTodoParamCheck } from '../middlewares/todo.middleware';
const todoRoutes = Router();


todoRoutes.get('/', getAllTodo );

todoRoutes.post('/add', addTodoParamCheck, addTodo );

todoRoutes.put('/delete', deleteTodoParamCheck, deleteTodo);

todoRoutes.patch('/update', updateTodoParamCheck, updateTodo);

export default todoRoutes;