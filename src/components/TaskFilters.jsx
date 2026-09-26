const STATUS_FILTERS = ["All", "Active", "Completed"];
const CATEGORY_FILTERS = ["All", "Personal", "Work", "Urgent"];

/**
 * Purely presentational: this component holds NO state of its own.
 * It just displays buttons and reports clicks back up via props.
 * All filter STATE actually lives in App.jsx ("lifting state up").
 */
function TaskFilters({
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
}) {
  return (
    <div className="task-filters">
      <div className="filter-group">
        {STATUS_FILTERS.map((status) => (
          <button
            key={status}
            className={statusFilter === status ? "active" : ""}
            onClick={() => onStatusChange(status)}
          >
            {status}
          </button>
        ))}
      </div>
      <select
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {CATEGORY_FILTERS.map((cat) => (
          <option key={cat} value={cat}>
            {cat === "All" ? "All Categories" : cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TaskFilters;
