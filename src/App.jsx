import "./App.css";
import { useEffect, useState } from "react";
import useTheme from "./useTheme.js";
import TaskCard from "./components/TaskoCard.jsx";

function App() {
    const [tasks, setTasks] = useState("");
    const [theme, setTheme] = useTheme();
    const [taskList, setTaskList] = useState(() => {
        const savedTasks = localStorage.getItem("taskList");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem("taskList", JSON.stringify(taskList));
    }, [taskList]);

    function handleTask(e) {
        e.preventDefault();
        if (!tasks.trim()) return;

        const newTask = {
            id: Date.now(),
            title: tasks.trim(),
            subject: "general",
        };

        setTaskList((currentList) => [...currentList, newTask]);
        setTasks("");
    }

    function deleteTask(id) {
        setTaskList((currentList) =>
            currentList.filter((task) => task.id !== id),
        );
    }

    return (
        <div className="container">
            <div className="theme-controls">
                <button
                    type="button"
                    className="theme-toggle"
                    aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                    aria-pressed={theme === "dark"}
                    onClick={() =>
                        setTheme((currentTheme) =>
                            currentTheme === "light" ? "dark" : "light",
                        )
                    }
                >
                    {theme === "light" ? "Dark mode" : "Light mode"}
                </button>
            </div>
            <header>
                <h1>Welcome to React</h1>
                <p>Get started by editing </p>
            </header>
            <form onSubmit={handleTask}>
                <input
                    value={tasks}
                    onChange={(e) => setTasks(e.target.value)}
                    type="text"
                    placeholder="Add a new task..."
                />
                <button type="submit">Add Task</button> 
            </form>
            <main>
                {taskList.length === 0 ? (
                    <p>No tasks yet.</p>
                ) : (
                    taskList.map((task) => (
                        <TaskCard
                            key={task.id}
                            id={task.id}
                            description={task.title}
                            subject={task.subject}
                            onDelete={deleteTask}
                        />
                    ))
                )}
            </main>
        </div>
    );
}

export default App;