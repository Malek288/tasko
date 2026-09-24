import "./App.css";
import { useState } from "react";
import TaskCard from "./components/TaskoCard.jsx";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
    const [tasks, setTasks] = useState("");
    const [taskList, setTaskList] = useState([]);

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
                            subject={task.subject}
                            description={task.title}
                            onDelete={() => deleteTask(task.id)}
                        />
                    ))
                )}
            </main>
            <SpeedInsights />
        </div>
    );
}

export default App;
