"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().getTime().toString(),
        text: body.text,
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'Added todo', todo: newTodo, todos: todos });
});
router.put('/todo/:todoId', (req, res, next) => {
    const body = req.body;
    const params = req.params;
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
    const params = req.params;
    const todoId = params.todoId;
    todos = todos.filter((item) => {
        return item.id !== todoId;
    });
    return res.status(200).json({ message: 'Deleted todo', todos: todos });
});
exports.default = router;
