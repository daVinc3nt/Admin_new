"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Switch from "@mui/material/Switch";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTheme(theme == "light" ? "dark" : "light")
    };
    return (
      <div className="rounded-full w-9 h-9 flex items-center justify-center">
        <Switch defaultChecked={theme == "light" ? false : true} color="error" onChange={handleChange} />
        {/* <LightModeIcon className="scale-110 text-yellow-500" role="button" onClick={() => setTheme('light')} /> */}
      </div>
    )
  };

  return (
    <>
      {renderThemeChanger()}
    </>
  );
};

export default ThemeSwitcher;
