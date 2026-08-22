"use client";

import { useEffect, useState } from "react";
import { HeaderNav } from "./header-nav";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const percent = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(Number.isNaN(percent) ? 0 : percent);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 -mx-8 border-b bg-background/80 backdrop-blur-sm sm:-mx-24">
      <div className="flex h-14 items-center justify-between px-8 sm:px-24">
        <HeaderNav />
        <ModeToggle />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px">
        <div className="h-px bg-foreground transition-[width] duration-150" style={{ width: `${scrollProgress}%` }} />
      </div>
    </header>
  );
};

export default Header;
