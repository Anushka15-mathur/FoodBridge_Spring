import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}