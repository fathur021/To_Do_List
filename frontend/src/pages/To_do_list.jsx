import React, { useState } from "react";
import { Link } from "react-router-dom";

const To_do_list = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      //  Tambahkan tugas baru ke daftar "todos"
      // ...todos = ambil semua isi todos yang lama
      // newTodo = tambahkan tugas baru di akhir
      setTodos([...todos, newTodo]);

      //Kosongkan input setelah berhasil tambah
      setInputValue("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };
  return (
    <div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="bg-white p-6 shadow-lg w-90 rounded-lg">
          <h1 className="text-center text-blue-400 font-bold text-2xl">
            To-Do-List :
          </h1>
          <div className="flex gap-2 mt-10">
            <input
              type="text"
              placeholder="Tulis Tangan ..."
              value={inputValue} // nilai state saat ini
              onChange={(e) => setInputValue(e.target.value)} //e = event dan setInputvalue adalah untuk mengubah state inputvalue
              className="flex-1 border border-gray-400 px-3 py-2 rounded-lg "
            />

            <button
              onClick={addTodo}
              className="bg-blue-600 px-2 py-3 cursor-pointer rounded-2xl text-white hover:bg-blue-700"
            >
              Tambah
            </button>
          </div>

          <div className="mt-6 space-y-2">
            {todos.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>✨ Belum ada tugas</p>
                <p className="text-sm">Mulai tambahkan tugas di atas</p>
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between bg-gray-200 p-3 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <input
                      onClick={() => toggleComplete(todo.id)}
                      className="w-5 h-5"
                      type="checkbox"
                    />
                    <Link
                    to={`detail/${todo.id}`}
                    className="flex-1 hover:text-blue-600"
                    >
                     <span className="cursor-pointer">{todo.text}</span>
                    </Link>
                    
                    
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-400 hover:text-red-600 cursor-pointer"
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 flex justify-around text-sm text-gray-500">
            <span>📊 Total: {todos.length}</span>
            <span>✅ Selesai: {todos.filter((t) => t.completed).length}</span>
            <span>⏳ Belum: {todos.filter((t) => !t.completed).length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default To_do_list;
