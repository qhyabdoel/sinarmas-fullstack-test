import express from "express";
import todosRouter from "./routes/todos.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Mount routes
app.use("/api", todosRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
