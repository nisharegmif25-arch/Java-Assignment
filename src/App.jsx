import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import TaskStats from "./components/TaskStats";
import "./App.css";

/**
 * App.jsx is the "orchestrator" - it owns the main state (the tasks array)
 * and passes both DATA and FUNCTIONS down to children as props.
 * This pattern is called "lifting state up": children don't manage
 * shared data themselves, they ask the parent to change it.
 */
function App() {
  // tasks is persisted automatically thanks to our custom hook.
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  // Filter state lives here too, since TaskFilters and TaskList both need it.
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  function handleAddTask(newTask) {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  }

  function handleToggleTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleDeleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function handleEditTask(id, newText) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  }

  // Derive the visible list from tasks + both filters.
  // We don't store a SEPARATE "filteredTasks" in state - we calculate
  // it fresh on every render. This avoids state getting out of sync.
  const visibleTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && !task.completed) ||
      (statusFilter === "Completed" && task.completed);

    const matchesCategory =
      categoryFilter === "All" || task.category === categoryFilter;

    return matchesStatus && matchesCategory;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="app">
      <header>
        <h1>My Tasks</h1>
        <p className="subtitle">Stay organized, one task at a time.</p>
      </header>

      <TaskForm onAddTask={handleAddTask} />

      <TaskStats total={tasks.length} completed={completedCount} />

      <TaskFilters
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
      />

      <TaskList
        tasks={visibleTasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
    </div>
  );
}

export default App;
