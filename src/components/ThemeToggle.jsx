import { useEffect, useState } from "react";
import { CiSun } from "react-icons/ci";
import { FaRegMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "ewucsc"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm">

      <input
        type="checkbox"
        checked={theme === "light"}
        onChange={() =>
          setTheme(theme === "light" ? "ewucsc" : "light")
        }
      />

      <CiSun className="swap-on h-7 w-7 text-warning" />
      <FaRegMoon className="swap-off h-5 w-5 text-primary" />

    </label>
  );
};

export default ThemeToggle;