import { useState } from "react";

/**
 * Renders ONE task. Notice this component has its OWN local state
 * (isEditing, editText) that has nothing to do with the parent -
 * not all state needs to live in App.jsx.
 */
function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  function handleEditSubmit(event) {
    event.preventDefault();
    const trimmed = editText.trim();
    if (trimmed === "") return;
    onEdit(task.id, trimmed);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li className="task-item">
        <form onSubmit={handleEditSubmit} className="edit-form">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      </li>
    );
  }

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <label className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="task-text">{task.text}</span>
      </label>
      <span className={`task-tag tag-${task.category.toLowerCase()}`}>
        {task.category}
      </span>
      <div className="task-actions">
        <button onClick={() => setIsEditing(true)} aria-label="Edit task">
          Edit
        </button>
        <button onClick={() => onDelete(task.id)} aria-label="Delete task">
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
