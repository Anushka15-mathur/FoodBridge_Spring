import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "How It Works", path: "/how-it-works" },
  { name: "Contact", path: "/contact" },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          className="text-sm font-medium text-gray-700 hover:text-[#556B2F] transition-colors"
        >
          {link.name}
        </NavLink>
      ))}
    </>
  );
}