import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-white/10 bg-heading py-20 text-white"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 lg:grid-cols-4">

        <div>
          <h2 className="mb-4 text-2xl font-bold text-primary">
            FoodBridge
          </h2>

          <p className="text-gray-400">
            Connecting restaurants, NGOs, volunteers and donors to reduce food
            waste and serve communities.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li>
              <a href="#home" className="transition hover:text-primary">
                Home
              </a>
            </li>

            <li>
              <a href="#about" className="transition hover:text-primary">
                About
              </a>
            </li>

            <li>
              <a href="#how-it-works" className="transition hover:text-primary">
                How It Works
              </a>
            </li>

            <li>
              <a href="#contact" className="transition hover:text-primary">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Contact
          </h3>

          <div className="space-y-3 text-gray-400">

            <a
              href="mailto:support@foodbridge.com"
              className="flex items-center gap-2 transition hover:text-primary"
            >
              <Mail size={18} />
              support@foodbridge.com
            </a>

            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 transition hover:text-primary"
            >
              <Phone size={18} />
              +91 98765 43210
            </a>

            <p className="flex items-center gap-2">
              <MapPin size={18} />
              Pune, Maharashtra
            </p>

          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Follow Us
          </h3>

          <div className="flex gap-5 text-2xl text-gray-400">

            <FaFacebook className="cursor-pointer transition duration-300 hover:-translate-y-1 hover:text-primary" />

            <FaInstagram className="cursor-pointer transition duration-300 hover:-translate-y-1 hover:text-primary" />

            <FaLinkedin className="cursor-pointer transition duration-300 hover:-translate-y-1 hover:text-primary" />

          </div>

        </div>

      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} FoodBridge. All rights reserved.
      </div>
    </footer>
  );
}