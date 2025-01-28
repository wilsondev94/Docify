"use client";

import { useDarkModeStore } from "@/store/darkModeStore";
import { useEffect } from "react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDarkMode } = useDarkModeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return children;
}
