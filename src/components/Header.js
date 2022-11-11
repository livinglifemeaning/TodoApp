import { useState } from "react";
import Moon from "../images/icon-moon.svg";
import Sun from "../images/icon-sun.svg";
import classes from "./Header.module.css";

const Header = () => {
  const [currentTheme, setCurrentTheme] = useState("light");
  const doc = document.firstElementChild;
  const handleSwitchColorTheme = () => {
    if (currentTheme === "light") {
      doc.setAttribute("data-color-scheme", "dark");
      setCurrentTheme("dark");
    } else if (currentTheme === "dark") {
      setCurrentTheme("light");
      doc.setAttribute("data-color-scheme", "light");
    }
  };
  return (
    <div className={classes.header}>
      <div className={classes.content}>
      <h1 className={classes.title}>Todo</h1>
      <span className={classes.themeToggle} onClick={handleSwitchColorTheme}>
        <img
          src={currentTheme === "light" ? Moon : Sun}
          alt={`Toggle theme to ${currentTheme} mode}`}
        />
      </span>
      </div>
    </div>
  );
};

export default Header;
