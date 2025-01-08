import Link from "next/link";
import React from "react";

function Footer() {
  const links = [
    { href: "https://docs.google.com/document/d/1ukQWNh2V1B5g9lDYLS0mno0kWYb0FqMHi8JQxa8Dx5I/edit?usp=sharing", label: "Resume" },
    { href: "https://github.com/smyaseen", label: "GitHub" },
    { href: "https://www.linkedin.com/in/sm-y/", label: "LinkedIn" },
    { href: "mailto:smyaseen164@gmail.com", label: "Email" },
  ];

  return (
    <footer className="mb-8 flex flex-col items-center justify-center text-sm leading-snug text-muted-foreground">
      <span>
        Reach out by&nbsp;
        {links.map((link, index) => (
          <React.Fragment key={link.href}>
            <Link href={link.href} target="_blank" rel="noopener noreferrer" className="underline">
              {link.label}
            </Link>
            {index < links.length - 1 ? index === links.length - 2 ? <span>&nbsp;or&nbsp;</span> : <span>,&nbsp;</span> : null}
          </React.Fragment>
        ))}
        .
      </span>
    </footer>
  );
}

export default Footer;
