"use client"
import { Theme } from "@radix-ui/themes";
import React, { createContext, ReactNode } from "react";
import { useState } from "react";
export const ThemeContext = createContext<{
  isDark:boolean
  setIsDark:((x:boolean)=>void) |null
}>({
  isDark:true,
  setIsDark:null
});
export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  return (
    <ThemeContext.Provider
      value={{
        isDark,
        setIsDark,
      }}
    >
      <Theme appearance={isDark ? "dark" : "light"}>{children}</Theme>
    </ThemeContext.Provider>
  );
}
