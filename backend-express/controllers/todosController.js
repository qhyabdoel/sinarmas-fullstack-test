import { v4 as uuidv4 } from "uuid";

let todos = []; // In-memory array to store todos

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

// GET /todos Get all todos
/**
 * @param {Request} req
 * @param {Response} res
 */
export const getTodos = (req, res) => {
  res.json(todos);
};

// POST /todos Create a new todo
/**
 * @param {Request} req
 * @param {Response} res
 */
export const createTodo = (req, res) => {
  const { title, completed = false } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTodo = {
    id: uuidv4(),
    title,
    completed,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
};

// PATCH /todos/:id Update a todo
/**
 * @param {Request} req
 * @param {Response} res
 */
export const updateTodo = (req, res) => {
  const { id } = req.params;
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  Object.assign(todo, req.body);
  res.json(todo);
};

// DELETE /todos/:id Delete a todo
/**
 * @param {Request} req
 * @param {Response} res
 */
export const deleteTodo = (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const deleted = todos.splice(index, 1);
  res.status(204).json(deleted[0]);
};
