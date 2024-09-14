"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  function handleThmeSwitch() {
    setTheme(theme === "dark" ? "light" : "dark");
    console.log(theme);
  }
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {isClient && (
        <Button onClick={() => handleThmeSwitch()} variant={"secondary"}>
          {theme === "dark" ? "Light" : "Dark"}
        </Button>
      )}
    </>
  );
}
