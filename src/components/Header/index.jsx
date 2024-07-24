import React, { useState, useEffect } from "react";
import SunIcon from "../icons/SunIcon";
import MoonIcon from "../icons/MoonIcon";
const Header = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <div className="flex mb-6 mt-24">
      <h1>devfinder</h1>
      <button className="ml-auto flex" onClick={toggleTheme}>
        {theme === "dark" ? (
          <>
            <span className="font-bold uppercase text-sm">LIGHT</span>
            <SunIcon className="ml-2 inline-block" />
          </>
        ) : (
          <>
            <span className=" font-bold uppercase text-sm">Dark</span>
            <MoonIcon className="ml-2 inline-block" />
          </>
        )}
      </button>
    </div>
  );
};

export default Header;
