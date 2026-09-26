import { useState } from "react";

const CATEGORIES = ["Personal", "Work", "Urgent"];

/**
 * A "controlled form" - React state is the single source of truth
 * for every input's value, instead of letting the DOM manage it.
 *
 * Parent -> Child communication happens via props (onAddTask).
 * Child -> Parent communication happens via a CALLBACK FUNCTION prop:
 * we don't return data from a child, we call a function the parent gave us.
 */
function TaskForm({ onAddTask }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Personal");

  function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page
    const trimmed = text.trim();
    if (trimmed === "") return; // ignore empty submissions

    onAddTask({
      id: crypto.randomUUID(),
      text: trimmed,
      category,
      completed: false,
      createdAt: Date.now(),
    });

    setText(""); // clear the input after adding
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What do you need to do?"
        aria-label="New task"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
