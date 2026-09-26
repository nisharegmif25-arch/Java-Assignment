import TaskItem from "./TaskItem";

/**
 * Renders a LIST of TaskItem components using .map().
 * Each item needs a unique "key" prop so React can efficiently
 * track which item is which when the list changes (add/remove/reorder).
 * We use task.id, NOT the array index - index keys break when
 * items are deleted or reordered.
 */
function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  // Conditional rendering: show a friendly empty state instead of a blank list.
  if (tasks.length === 0) {
    return (
      <p className="empty-state">
        No tasks here. Add one above to get started!
      </p>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TaskList;
