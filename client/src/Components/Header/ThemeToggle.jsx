// import { useEffect, useState } from "react";
import { useContext } from "react";
import { GoSun,GoMoon } from "react-icons/go";
import { ThemeContext } from "../../Providers/ThemeChangeProvider";

const ThemeToggle = () => {

const {theme,hanleToggle} = useContext(ThemeContext)

  return (
    <>
      <label className="swap outline-none border-none swap-rotate">
        {/* this hidden checkbox controls the state */}
        <input onChange={hanleToggle} type="checkbox"
        // show toggle image based on localstorage theme
        checked={theme === "light" ? false : true}
        />

        {/* sun icon */}
        <GoSun className={`swap-on ${theme ==='light' ? 'text-black' : 'text-white'} fill-current text-3xl`}/>

        {/* moon icon */}
        <GoMoon className={`swap-off ${theme ==='light' ? 'text-black' : 'text-white'}  fill-current text-3xl`}/>


      </label>
    </>
  );
};

export default ThemeToggle;
