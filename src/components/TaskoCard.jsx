import "./TaskCard.css";
import { useState } from "react";

function TaskCard({
    subject = "Default subject",
    description = "Default description",
    onDelete = () => {},
}) {
    const [isComplete, setIsComplete] = useState(false);

    function handleTask() {
        setIsComplete(!isComplete);
    }

    return (
        <div className={`task-card ${isComplete ? "completed" : ""}`}>
            <span className="task-badge">{subject}</span>
            <div className="task-row">
                <h3 className="task-text">{description}</h3>

                <div className="task-actions">
                    <button
                        type="button"
                        className="delete-button"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        className={`task-button ${isComplete ? "done" : ""}`}
                        onClick={handleTask}
                    >
                        {isComplete ? "Done" : "Complete"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskCard;
