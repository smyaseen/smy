"use client";

import { ArrowBigUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      aria-label="Scroll to top"
      className={`ml-auto transition-opacity duration-300 dark:outline-2 ${isVisible ? "opacity-100" : "pointer-events-none opacity-0"}`}
      onClick={scrollToTop}
    >
      <ArrowBigUp className="h-4 w-4" />
    </Button>
  );
};

export default ScrollToTop;
