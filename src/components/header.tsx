"use client";

import { useEffect, useState } from "react";
import { HeaderNav } from "./header-nav";
import { ModeToggle } from "./mode-toggle";

function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function Header() {
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
    };

    const debounceHandleScroll = debounce(handleScroll, 100);

    window.addEventListener("scroll", debounceHandleScroll);
    return () => {
      window.removeEventListener("scroll", debounceHandleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full flex items-center justify-between bg-white dark:bg-black z-50 px-4 md:px-24 py-2 transition-shadow duration-300 ${hasShadow ? "shadow-md" : ""}`}
    >
      <HeaderNav />
      <ModeToggle />
    </header>
  );
}

export default Header;
