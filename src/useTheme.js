import { useEffect, useState } from "react";

function useTheme() {
    const [theme, setTheme] = useState(() =>
        localStorage.getItem("theme") === "dark" ? "dark" : "light",
    );

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        document.querySelector('meta[name="theme-color"]').content =
            theme === "dark" ? "#0f1b1e" : "#f4efe6";
        localStorage.setItem("theme", theme);
    }, [theme]);

    return [theme, setTheme];
}

export default useTheme;
