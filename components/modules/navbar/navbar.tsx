import React from "react";
import NavbarLink from "./navbarLink";

function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full flex justify-between p-4 text-white">
      <div className="text-4xl font-bold">Project Manager</div>
      <div className="space-x-4 flex justify-center items-center gap-3 text-xl font-bold">
        <NavbarLink title="Home" href="#" />
        <NavbarLink title="About" href="#" />
        <NavbarLink title="Contact" href="#" />
        <NavbarLink title="Login / Register" href="/login" />
      </div>
    </nav>
  );
}

export default Navbar;
