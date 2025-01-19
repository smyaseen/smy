"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HeaderNav } from "./header-nav";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  const [hasShadow, setHasShadow] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const path = usePathname();

  const handleScroll = () => {
    setHasShadow(window.scrollY > 0);
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    setScrollProgress(isNaN(scrollPercent) ? 0 : scrollPercent);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    handleScroll();
  }, [path]);

  return (
    <header
      className={`fixed top-0 left-0 w-full flex flex-col items-center justify-between bg-white dark:bg-black z-50 px-4 md:px-24 py-2 transition-shadow duration-300 ${hasShadow ? "shadow-md" : ""}`}
    >
      <div style={{ width: `${scrollProgress}%` }} className="absolute border-black dark:border-white border-b-4 h-1 bottom-0 left-0"></div>
      <div className="w-full flex items-center justify-between">
        <HeaderNav />
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
