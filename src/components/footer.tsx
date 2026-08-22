import site from "@/lib/site";
import Link from "next/link";

const links = [
  { href: site.links.resume, label: "Resume" },
  { href: "https://github.com/smyaseen", label: "GitHub" },
  { href: "https://www.linkedin.com/in/sm-y/", label: "LinkedIn" },
  { href: "mailto:smyaseen164@gmail.com", label: "Email" },
];

function Footer() {
  return (
    <footer className="mt-auto flex flex-col items-center justify-between gap-3 border-t py-6 text-[13px] text-muted-foreground sm:flex-row">
      <span className="text-muted-foreground/70">© {new Date().getFullYear()} Syed Muhammad Yaseen</span>
      <nav className="flex items-center gap-5">
        {links.map((link) => (
          <Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}

export default Footer;
