// App.js

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Membuat Modul', priority: 'High', status: 'Done', dueDate: '2024-10-29', completedDate: '2024-10-30'},
    { id: 2, title: 'Baca buku', priority: 'Low', status: 'In Progress', dueDate: '2024-11-09', completedDate: '2024-11-20' },
    { id: 2, title: 'Mengerjakan Laporan', priority: 'Medium', status: 'To Do', dueDate: '2024-11-30', completedDate: null},
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  const addTask = (task) => setTasks([...tasks, task]);

  const updateTask = (id, updatedTask) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        // Jika tugas diubah menjadi "Done", simpan tanggal penyelesaiannya
        if (updatedTask.status === 'Done' && task.status !== 'Done') {
          return { ...updatedTask, completedDate: new Date().toISOString().split('T')[0] }; // Format: YYYY-MM-DD
        }
        return { ...task, ...updatedTask };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Filter tasks berdasarkan kata kunci pencarian
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="container mt-5">
      <h1>DAILY TO-DO LIST</h1>
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchQuery}
        onChange={handleSearch}
        className="form-control mb-3"
      />
      
      {/* Button to trigger modal */}
      <Button variant="primary" onClick={handleShowModal}>
        Add Task
      </Button>

      {/* Modal for adding task */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTodo addTask={addTask} />
        </Modal.Body>
      </Modal>

      <TodoList tasks={filteredTasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
