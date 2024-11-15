import React, { useState } from 'react';

function AddTodo({ addTask }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('To Do');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ id: Date.now(), title, priority, status, dueDate });
    setTitle('');
    setPriority('Medium');
    setStatus('To Do');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <div className="form-group">
        <label>Task Title</label>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="form-control"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <div className="form-group">
        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="form-control"
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>

      <div className="form-group">
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add Task
      </button>
    </form>
  );
}

export default AddTodo;
