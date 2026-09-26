/**
 * Simple presentational component - takes numbers as props, displays them.
 * Keeping this separate from TaskList keeps each component focused
 * on ONE job (a good React practice called "separation of concerns").
 */
function TaskStats({ total, completed }) {
  const remaining = total - completed;

  return (
    <div className="task-stats">
      <span>{total} total</span>
      <span>{remaining} remaining</span>
      <span>{completed} completed</span>
    </div>
  );
}

export default TaskStats;
