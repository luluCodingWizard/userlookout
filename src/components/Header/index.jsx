import React from "react";
import SunIcon from "../icons/SunIcon";
import MoonIcon from "../icons/MoonIcon";
import useTheme from "../../hooks/useTheme";
const Header = () => {
  const [theme, toggleTheme] = useTheme();
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
