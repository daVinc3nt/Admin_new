"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const {systemTheme, theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const renderThemeChanger= () => {
    if(!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme ;

    if(currentTheme ==="dark"){
      return (
        <div className="">
        <LightModeIcon className="w-6 h-6 text-yellow-500 mt-2" role="button" onClick={() => setTheme('light')} />
        </div>
      )
    }

    else {
      return (
        <div className="rounded-full bg-gray-100 w-9 h-9 flex items-center justify-center">
        <DarkModeIcon className="scale-110 text-violet-900" role="button" onClick={() => setTheme('dark')} />
        </div>
      )
    }
 };

  return (
    <>
    {renderThemeChanger()}
    </>
  );
};

export default ThemeSwitcher;
