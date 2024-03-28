import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskImage, setTaskImage] = useState(null);
  const [taskText, setTaskText] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [addingTask, setAddingTask] = useState(false); // State to track if a new task is being added

  const handleTaskInputChange = (event) => {
    setTaskText(event.target.value);
  };

  const handleTitleInputChange = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleDescriptionInputChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleImageInputChange = (event) => {
    setTaskImage(event.target.files[0]);
  };

  const addTask = () => {
    // Set addingTask to true when Add Task button is clicked
    setAddingTask(true);
    if (taskTitle.trim() !== '') {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        description: taskDescription,
        image: taskImage,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskTitle('');
      setTaskDescription('');
      setTaskImage(null);
      // Reset addingTask after adding a task
      setAddingTask(false);
    }
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const editTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTask(taskId);
    setTaskTitle(taskToEdit.title);
    setTaskDescription(taskToEdit.description);
  };

  const saveTask = (taskId, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? updatedTask : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setTaskTitle('');
    setTaskDescription('');
    setTaskImage(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Task Manager</h1>
      {/* Conditionally render input fields only when addingTask is true */}
      {addingTask && (
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter task title..."
            value={taskTitle}
            onChange={handleTitleInputChange}
          />
          <textarea
            className="form-control mb-2"
            value={taskDescription}
            onChange={handleDescriptionInputChange}
            rows="3"
            placeholder="Enter task description..."
          ></textarea>
          <div className="mb-2">
            <label htmlFor="imageInput" className="form-label">
              Upload Image:
            </label>
            <input
              type="file"
              id="imageInput"
              className="form-control"
              onChange={handleImageInputChange}
            />
          </div>
        </div>
      )}
      <div className="input-group-append">
        <button className="btn btn-primary" type="button" onClick={addTask}>
          Add Task
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task) => (
            
          <li
            key={task.id}
            className={`list-group-item ${task.completed ? 'completed' : 'not-completed'}`}
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }} // Inline style for completed tasks
          >
            {/* Render either edit mode or view mode based on editingTask state */}
            {editingTask === task.id ? (
              <div>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
                <textarea
                  className="form-control mb-2"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  rows="3"
                  placeholder="Enter description..."
                ></textarea>
                <div className="mb-2">
                  <label htmlFor={`imageInput-${task.id}`} className="form-label">
                    Upload Image:
                  </label>
                  <input
                    type="file"
                    id={`imageInput-${task.id}`}
                    className="form-control"
                    onChange={handleImageInputChange}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-success btn-sm mr-2"
                  onClick={() => saveTask(task.id, { ...task, title: taskTitle, description: taskDescription })}
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                {task.image && <img src={URL.createObjectURL(task.image)} alt="Task" />}
              </div>
            )}
            <div>
              <button
                type="button"
                className="btn btn-secondary btn-sm mr-2"
                onClick={() => editTask(task.id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
              <button
                type="button"
                className={`btn btn-${task.completed ? 'warning' : 'success'} btn-sm ml-2`}
                onClick={() => toggleTaskCompletion(task.id)}
              >
                {task.completed ? 'Mark as Undone' : 'Mark as Done'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
