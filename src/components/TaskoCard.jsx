import "./TaskCard.css";
import { useState } from "react";

function TaskCard({
    id,
    subject = "Default subject",
    description = "Default description",
    onDelete = () => {},
}) {
    const [isComplete, setIsComplete] = useState(false);
    const video = getEmbeddedVideo(description);

    function handleTask() {
        setIsComplete(!isComplete);
    }

    return (
        <div className={`task-card ${isComplete ? "completed" : ""}`}>
            <span className="task-badge">{subject}</span>
            <div className="task-row">
                <h3 className="task-text">
                    {video?.description || (video ? "Watch this video" : description)}
                </h3>

                <div className="task-actions">
                    <button
                        type="button"
                        className="delete-button"
                        onClick={() => onDelete(id)}
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
            {video && (
                <div className="task-video">
                    {video.kind === "file" ? (
                        <video controls preload="metadata">
                            <source src={video.url} />
                            Your browser does not support embedded videos.
                        </video>
                    ) : (
                        <iframe
                            src={video.url}
                            title={`Video for ${video.description || "task"}`}
                            sandbox={video.trustedProvider ? undefined : "allow-scripts allow-presentation"}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    )}
                </div>
            )}
        </div>
    );
}

function getEmbeddedVideo(description) {
    const urlMatch = description.match(/https?:\/\/[^\s]+/i);
    if (!urlMatch) return null;

    const videoUrl = urlMatch[0]
        .replace(/[.,!?;:)\]}»،]+$/, "")
        .replace(/(["'])/g, "");
    let url;

    try {
        url = new URL(videoUrl);
    } catch {
        return null;
    }

    if (!["http:", "https:"].includes(url.protocol)) return null;

    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    let embedUrl = videoUrl;
    let kind = "embed";
    let trustedProvider = url.pathname.split("/").some((segment) => segment.toLowerCase() === "embed");

    if (
        host === "youtu.be" ||
        host === "youtube.com" ||
        host === "m.youtube.com" ||
        host === "youtube-nocookie.com"
    ) {
        const videoId =
            host === "youtu.be"
                ? url.pathname.split("/")[1]
                : url.searchParams.get("v") ||
                  url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1];

        if (videoId && /^[\w-]{11}$/.test(videoId)) {
            embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
            trustedProvider = true;
        }
    } else if (host === "vimeo.com" || host === "player.vimeo.com") {
        const videoId = url.pathname.match(/\/(?:video\/)?(\d+)/)?.[1];
        if (videoId) {
            embedUrl = `https://player.vimeo.com/video/${videoId}`;
            trustedProvider = true;
        }
    } else if (/\.(?:mp4|webm|ogg|m4v)$/i.test(url.pathname)) {
        kind = "file";
    }

    const taskDescription = description.replace(urlMatch[0], "").trim();
    return { url: embedUrl, kind, description: taskDescription, trustedProvider };
}

export default TaskCard;
