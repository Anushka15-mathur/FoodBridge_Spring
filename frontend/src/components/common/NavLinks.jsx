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
          className={({ isActive }) =>
            `transition-colors duration-200 font-medium ${
              isActive
                ? "text-[#556B2F]"
                : "text-gray-600 hover:text-[#556B2F]"
            }`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </>
  );
}