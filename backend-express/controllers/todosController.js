import { v4 as uuidv4 } from "uuid";

let todos = []; // In-memory array to store todos

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * Get all todos
 *
 * Get /todos
 *
 * @param {Request} req
 * @param {Response} res
 *
 * @returns {Array} 200 - List of todos
 */
export const getTodos = (req, res) => {
  res.json(todos);
  return;
};

/**
 * Create a new todo
 *
 * POST /todos
 *
 * @param {Request} req
 * @param {Response} res
 *
 * @example
 * // Request body
 * {
 *   "title": "New Todo",
 *   "completed": false
 * }
 *
 * @returns {Object} 201 - Created todo
 * @returns {Object} 400 - Invalid request body
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
  return;
};

/**
 * Update a todo
 *
 * PATCH /todos/:id
 *
 * @param {Request} req
 * @param {Response} res
 *
 * @example
 * // Request body
 * {
 *   "title": "New Todo",
 *   "completed": false
 * }
 *
 * @returns {Object} 200 - Updated todo
 * @returns {Object} 400 - Invalid request body
 * @returns {Object} 404 - Todo not found
 */
export const updateTodo = (req, res) => {
  const { id } = req.params;
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  Object.assign(todo, req.body);
  res.json(todo);
  return;
};

// DELETE /todos/:id Delete a todo
/**
 * @param {Request} req
 * @param {Response} res
 *
 * @returns {Object} 204 - No content
 * @returns {Object} 404 - Todo not found
 */
export const deleteTodo = (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todos.splice(index, 1);
  res.status(204).send();
  return;
};
