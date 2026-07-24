import { Link } from "react-router-dom";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-[#FAF7F0]/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          <NavLinks />
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>

          <Link to="/register">
            <Button className="bg-[#556B2F] hover:bg-[#465926]">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}