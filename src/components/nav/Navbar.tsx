import { useEffect, useState } from "react";
import clsx from "clsx";
import { useStickyAfterHero } from "../../hooks/useStickyAfterHero";

const navItems = [
  { label: "Hero", href: "#hero" },
  { label: "Clients", href: "#clients" },
  { label: "TTS", href: "#tts" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Security", href: "#security" },
  { label: "Docs", href: "#docs" },
  { label: "Languages", href: "#languages" },
  { label: "Integrations", href: "#integrations" }
];

const Navbar = () => {
  const isSticky = useStickyAfterHero("hero");

  return (
    <>
      <div className={isSticky ? "h-16" : "h-0"} aria-hidden="true" />
      {isSticky && (
        <header
          className={clsx(
            "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
            "backdrop-blur-xl bg-[rgba(1,4,1,0.72)] shadow-[0_24px_60px_rgba(1,4,1,0.45)] border-b border-white/10"
          )}
        >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 md:px-10 lg:px-16">
          <a href="#hero" className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent text-brand-inverse font-semibold">
              IL
            </span>
            <span className="font-heading text-lg tracking-tight">IndusLabs</span>
          </a>
        <nav className="hidden items-center gap-8 text-sm text-brand-subtle md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="relative transition-colors duration-300 hover:text-brand"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#docs"
            className="rounded-full border border-brand px-4 py-2 text-sm text-brand-subtle transition duration-300 hover:text-brand"
          >
            Docs
          </a>
          <a
            href="#hero"
            className="rounded-full bg-brand-accent px-5 py-2 text-sm font-medium text-brand-inverse shadow-brand-md transition duration-300 hover:shadow-brand"
          >
            Try the Demo
          </a>
        </div>
        </div>
      </header>
      )}
    </>
  );
};

export default Navbar;
