const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// ROUTES //

// post a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (description) VALUES($1)",
      [description]
    );
    res.json(newTodo);
  } catch (error) {
    console.log(error.message);
  }
});

// Get All Todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todos");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// Get Single Todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todos WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// Update a Todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todos SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("HEllo");
  } catch (error) {
    console.log(error.message);
  }
});
// Update a Todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todos WHERE todo_id = $1",
      [id]
    );
    res.json("HEllo");
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(5000, () => {
  console.log("server has been started");
});
