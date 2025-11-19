import { useEffect, useState } from "react";
import { conf } from "../conf/conf.js";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const token = localStorage.getItem("token");

  /* ----------------------------- FETCH TODOS ----------------------------- */
  useEffect(() => {
    fetch(`${conf.apiDomain}/api/todos/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setTodos);
  }, []);

  /* ----------------------------- ADD TODO ----------------------------- */
  const addTodo = async () => {
    if (!text.trim()) return;

    const res = await fetch(`${conf.apiDomain}/api/todos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });

    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setText("");
  };

  /* ----------------------------- DELETE TODO ----------------------------- */
  const deleteTodo = async (id) => {
    await fetch(`${conf.apiDomain}/api/todos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setTodos(todos.filter((t) => t._id !== id));
  };

  /* ----------------------------- TOGGLE COMPLETE ----------------------------- */
  const toggleComplete = async (todo) => {
    await fetch(`${conf.apiDomain}/api/todos/${todo._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completed: !todo.completed, text: todo.text }),
    });

    setTodos(
      todos.map((t) =>
        t._id === todo._id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  /* ----------------------------- START EDIT MODE ----------------------------- */
  const startEdit = (todo) => {
    setEditId(todo._id);
    setEditText(todo.text);
  };

  /* ----------------------------- SAVE EDIT ----------------------------- */
  const saveEdit = async () => {
    await fetch(`${conf.apiDomain}/api/todos/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: editText }),
    });

    setTodos(
      todos.map((t) => (t._id === editId ? { ...t, text: editText } : t))
    );

    setEditId(null);
    setEditText("");
  };

  return (
    <div className="p-10 max-w-xl mx-auto w-[100%]">
      <h1 className="text-3xl font-bold mb-6">My Todos</h1>

      {/* ADD TODO */}
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border px-3 py-2 rounded"
          placeholder="Enter todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white px-4 rounded cursor-pointer"
        >
          Add
        </button>
      </div>

      {/* TODO LIST */}
      <ul className="space-y-2">
        {todos.map((t) => (
          <li
            key={t._id}
            className="p-3 bg-gray-100 border rounded flex justify-between items-center"
          >
            {/* Toggle Complete */}
            <input
              className="h-[20px] w-[20px] cursor-pointer"
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleComplete(t)}
            />

            {/* Text or Edit Field */}
            {editId === t._id ? (
              <input
                className="flex-1 mx-3 border px-2 py-1 rounded"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <span
                className={`flex-1 mx-3 ${
                  t.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {t.text}
              </span>
            )}

            {/* Edit / Save */}
            {editId === t._id ? (
              <button
                onClick={saveEdit}
                className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer hover:opacity-50"
              >
                Save
              </button>
            ) : t.completed ? (
              ""
            ) : (
              <button
                onClick={() => startEdit(t)}
                className="bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer hover:opacity-50"
              >
                Edit
              </button>
            )}

            {/* Delete */}
            <button
              onClick={() => deleteTodo(t._id)}
              className="bg-red-600 text-white px-3 py-1 rounded ml-2 cursor-pointer hover:opacity-50"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
