import "./App.css";
import { useEffect, useState } from "react";
import useTheme from "./useTheme.js";
import TaskCard from "./components/TaskoCard.jsx";

function App() {
    const [tasks, setTasks] = useState("");
    const [privateTaskInput, setPrivateTaskInput] = useState("");
    const [showPrivateTasks, setShowPrivateTasks] = useState(false);
    const [theme, setTheme] = useTheme();
    const [taskList, setTaskList] = useState(() => {
        const savedTasks = localStorage.getItem("taskList");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [privateTaskList, setPrivateTaskList] = useState(() => {
        const savedTasks = localStorage.getItem("privateTaskList");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem("taskList", JSON.stringify(taskList));
    }, [taskList]);

    useEffect(() => {
        localStorage.setItem("privateTaskList", JSON.stringify(privateTaskList));
    }, [privateTaskList]);

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

    function handlePrivateTask(e) {
        e.preventDefault();
        if (!privateTaskInput.trim()) return;

        const newTask = {
            id: Date.now(),
            title: privateTaskInput.trim(),
            subject: "private",
        };

        setPrivateTaskList((currentList) => [...currentList, newTask]);
        setPrivateTaskInput("");
    }

    function deletePrivateTask(id) {
        setPrivateTaskList((currentList) =>
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
                <h1>{showPrivateTasks ? "Private tasks" : "My tasks"}</h1>
                <p>
                    {showPrivateTasks
                        ? "Only saved in this browser, separate from your task list."
                        : "Keep track of what you need to get done."}
                </p>
            </header>
            {showPrivateTasks ? (
                <>
                    <button
                        type="button"
                        className="back-button"
                        onClick={() => setShowPrivateTasks(false)}
                    >
                        Back to my tasks
                    </button>
                    <form onSubmit={handlePrivateTask}>
                        <input
                            value={privateTaskInput}
                            onChange={(e) => setPrivateTaskInput(e.target.value)}
                            type="text"
                            placeholder="Add a private task..."
                            aria-label="Add a private task"
                        />
                        <button type="submit">Add Task</button>
                    </form>
                    <main>
                        {privateTaskList.length === 0 ? (
                            <p>No private tasks yet.</p>
                        ) : (
                            privateTaskList.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    id={task.id}
                                    description={task.title}
                                    subject={task.subject}
                                    onDelete={deletePrivateTask}
                                />
                            ))
                        )}
                    </main>
                </>
            ) : (
                <>
                    <form onSubmit={handleTask}>
                        <input
                            value={tasks}
                            onChange={(e) => setTasks(e.target.value)}
                            type="text"
                            placeholder="Add a new task..."
                            aria-label="Add a task"
                        />
                        <button type="submit">Add Task</button>
                    </form>
                    <main>
                        {taskList.length === 0 ? (
                            <button
                                type="button"
                                className="empty-state"
                                onClick={() => setShowPrivateTasks(true)}
                            >
                                No tasks yet.
                            </button>
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
                </>
            )}
        </div>
    );
}

export default App;