import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === '') return;
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 "style={{background:'linear-gradient(to bottom,blue,lightblue)'}}>
    <div className="border rounded shadow-sm p-4 " style={{ width: '100%', maxWidth: '600px',backgroundColor:'lightblue' }}>
      <h2 className="text-center mb-4">📝 My Todo List</h2>
  
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a Task?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTodo}>
          Add
        </button>
      </div>
  
      {todos.length === 0 ? (
        <p className="text-muted text-center">No tasks yet. Start by adding one!</p>
      ) : (
        <ul className="list-group">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="list-group-item d-flex justify-content-between align-items-center border rounded mb-2 shadow-sm"
            >
              <span
                onClick={() => toggleComplete(todo.id)}
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? 'gray' : 'black',
                  cursor: 'pointer',
                  flex: 1,
                }}
              >
                {todo.text}
              </span>
              <button
                className="btn btn-sm btn-outline-danger ms-2"
                onClick={() => deleteTodo(todo.id)}
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
  
  );
}

export default App;

