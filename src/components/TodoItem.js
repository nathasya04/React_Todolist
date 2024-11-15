import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

function TodoItem({ task, updateTask, deleteTask }) {
  const handleStatusChange = (e) => {
    updateTask(task.id, { ...task, status: e.target.value });
  };

  // Hitung jumlah hari tersisa hingga due date
  const calculateDaysLeft = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const timeDiff = due - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysLeft;
  };

  const daysLeft = calculateDaysLeft(task.dueDate);

  // Tentukan kelas warna untuk peringatan
  let deadlineWarning = '';
  if (daysLeft !== null) {
    if (daysLeft < 0) {
      deadlineWarning = 'text-danger'; // Merah jika sudah lewat
    } else if (daysLeft <= 2) {
      deadlineWarning = 'text-warning'; // Kuning jika mendekati deadline
    }
  }

  return (
    <div className="card mb-3 p-3 shadow-sm">
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mb-1">
          {task.title}
        </h5>
        
        {/* Tampilkan ikon centang jika tugas selesai */}
        {task.status === 'Done' && <FaCheckCircle className="text-success ms-2" />}
        
        <span className={`badge ${task.priority === 'High' ? 'bg-danger' : task.priority === 'Medium' ? 'bg-warning' : 'bg-secondary'}`}>
          {task.priority}
        </span>
      </div>
      <p className="mb-1">Priority: {task.priority}</p>
      <p className="mb-1">Due Date: {task.dueDate || 'No due date set'}</p>
      <p className={`mb-1 ${deadlineWarning}`}>
        {daysLeft !== null 
          ? daysLeft < 0 
            ? `Deadline missed by ${Math.abs(daysLeft)} days`
            : `${daysLeft} days left`
          : ''}
      </p>

      {/* Tampilkan tanggal selesai jika tugas selesai */}
      {task.status === 'Done' && task.completedDate && (
        <p className="text-success">Completed on: {task.completedDate}</p>
      )}

      <div className="d-flex align-items-center">
        <select value={task.status} onChange={handleStatusChange} className="form-select form-select-sm me-2">
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <button onClick={() => deleteTask(task.id)} className="btn btn-danger btn-sm">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
