import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const addTodo = async () => {
    const text = newTodo.trim();
    if (!text) return;
    await addDoc(collection(db, "todos"), {
      text,
      completed: false,
      createdAt: serverTimestamp(),
    });
    setNewTodo("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTodo();
  };

  const toggleComplete = async (id, completed) => {
    await updateDoc(doc(db, "todos", id), { completed: !completed });
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = async (id) => {
    const text = editText.trim();
    if (!text) {
      // Restore the original text rather than silently discarding the edit.
      setEditingId(null);
      setEditText("");
      return;
    }
    await updateDoc(doc(db, "todos", id), { text });
    setEditingId(null);
    setEditText("");
  };

  const handleEditKeyDown = (e, id) => {
    if (e.key === "Enter") saveEdit(id);
    if (e.key === "Escape") {
      setEditingId(null);
      setEditText("");
    }
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-16 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">📝 Edvin's Slave Tasks</h1>
        <p className="text-sm text-gray-500 mb-6">
          {completedCount}/{todos.length} tasks completed
        </p>

        {/* Add task input */}
        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task…"
            aria-label="New task"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Add
          </button>
        </div>

        {/* Task list */}
        {loading ? (
          <p className="text-center text-gray-400 text-sm py-8">Loading…</p>
        ) : todos.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-8">
            No tasks yet. Add one above!
          </p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between gap-2 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id, todo.completed)}
                    className="w-4 h-4 accent-blue-500 cursor-pointer shrink-0"
                    aria-label={`Mark "${todo.text}" as ${todo.completed ? "incomplete" : "complete"}`}
                  />
                  {editingId === todo.id ? (
                    <input
                      autoFocus
                      className="flex-1 border border-blue-300 rounded px-2 py-0.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => handleEditKeyDown(e, todo.id)}
                      onBlur={() => saveEdit(todo.id)}
                      aria-label="Edit task"
                    />
                  ) : (
                    <span
                      className={`text-sm truncate ${
                        todo.completed
                          ? "line-through text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {todo.text}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {editingId !== todo.id && (
                    <button
                      onClick={() => startEdit(todo)}
                      className="text-gray-400 hover:text-blue-500 transition-colors p-1 rounded"
                      aria-label={`Edit "${todo.text}"`}
                      title="Edit"
                    >
                      ✏️
                    </button>
                  )}
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded"
                    aria-label={`Delete "${todo.text}"`}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TodoApp;
