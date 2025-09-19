const links = [
  { label: "API", href: "#" },
  { label: "Docs", href: "#docs" },
  { label: "Security", href: "#security" },
  { label: "Careers", href: "#" },
  { label: "Contact", href: "#contact" }
];

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/40 py-8 text-sm text-brand-subtle">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 text-center md:flex-row md:px-10 lg:px-16">
        <span className="font-heading text-base text-brand">IndusLabs</span>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-brand">
              {link.label}
            </a>
          ))}
        </div>
        <span className="text-xs uppercase tracking-[0.28em] text-brand-subtle">Made in Bharat.</span>
      </div>
    </footer>
  );
};

export default Footer;