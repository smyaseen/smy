"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { HeaderNav } from "./header-nav";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  const [hasShadow, setHasShadow] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const path = usePathname();

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    setHasShadow(scrollTop > 0);
    setScrollProgress(isNaN(scrollPercent) ? 0 : scrollPercent);

    if (scrollTop > lastScrollY) {
      // Scrolling down
      setIsVisible(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }

    setLastScrollY(scrollTop);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    handleScroll();
  }, [path]);

  return (
    <>
      <div style={{ width: `${scrollProgress}%` }} className="fixed top-0 left-0 rounded-r-full border-black dark:border-white border-b-4 h-1 z-50"></div>
      <header
        className={`fixed top-0 left-0 w-full flex flex-col items-center justify-between bg-white/80 dark:bg-black/80 z-40 px-4 md:px-24 py-2 transition-shadow duration-300 ${
          hasShadow ? "shadow-md" : ""
        } ${isVisible ? "translate-y-0" : "-translate-y-full"} transition-transform duration-300`}
      >
        <div className="w-full flex items-center justify-between">
          <HeaderNav />
          <ModeToggle />
        </div>
      </header>
    </>
  );
};

export default Header;