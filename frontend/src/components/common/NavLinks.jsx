const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Contact", href: "#contact" },
];

export default function NavLinks() {
  return (
    <div className="flex items-center gap-8">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className="font-medium text-gray-600 transition-colors duration-300 hover:text-primary"
        >
          {link.name}
        </a>
      ))}
    </div>
  );
}