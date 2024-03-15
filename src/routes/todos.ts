import { Router } from 'express';
import { Todo } from '../models/todo';

const router = Router();
let todos: Todo[] = [];

type reqBody = { text: string };
type reqParams = { todoId: string };

router.get('/', (req, res, next) => {
	res.status(200).json({ todos: todos });
});

router.post('/todo', (req, res, next) => {
	const body = req.body as reqBody;
	const newTodo: Todo = {
		id: new Date().getTime().toString(),
		text: body.text,
	};

	todos.push(newTodo);

	res.status(201).json({ message: 'Added todo', todo: newTodo, todos: todos });
});

router.put('/todo/:todoId', (req, res, next) => {
	const body = req.body as reqBody;
	const params = req.params as reqParams;
	const todoId = params.todoId;
	const todoIndex = todos.findIndex((item) => {
		return item.id === todoId;
	});

	if (todoIndex < 0) {
		return res.status(400).json({ message: 'Could not find an Todo' });
	}

	todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
	res.status(200).json({ message: 'Updated todo', todos: todos });
});

router.delete('/todo/:todoId', (req, res, next) => {
	const params = req.params as reqParams;
	const todoId = params.todoId;

	todos = todos.filter((item) => {
		return item.id !== todoId;
	});

	return res.status(200).json({ message: 'Deleted todo', todos: todos });
});

export default router;
