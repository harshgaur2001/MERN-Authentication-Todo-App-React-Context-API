import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

/* ---------------------- CREATE TODO ---------------------- */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { text } = req.body;

    const user = await User.findById(userId);
    user.todos.push({ text });
    await user.save();

    res.json(user.todos[user.todos.length - 1]); // return the newly added todo
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

/* ---------------------- GET ALL TODOS ---------------------- */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    res.json(user.todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

/* ---------------------- UPDATE TODO ---------------------- */
router.put("/:todoId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { todoId } = req.params;
    const { text, completed } = req.body;

    await User.updateOne(
      { _id: userId, "todos._id": todoId },
      {
        $set: {
          "todos.$.text": text,
          "todos.$.completed": completed,
        },
      }
    );

    res.json({ message: "Todo updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

/* ---------------------- DELETE TODO ---------------------- */
router.delete("/:todoId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { todoId } = req.params;

    await User.updateOne(
      { _id: userId },
      { $pull: { todos: { _id: todoId } } }
    );

    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

export default router;
