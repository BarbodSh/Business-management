"use client";
import React from "react";
import NavbarLink from "./navbarLink";
import { useGetme } from "@/lib/frontend/hook.ts/getme";

function Navbar() {
  const { data, isLoading } = useGetme();
  console.log(data);
  return (
    <nav className="absolute top-0 left-0 w-full flex justify-between p-4 text-white">
      <div className="text-4xl font-bold">Project Manager</div>
      <div className="space-x-4 flex justify-center items-center gap-3 text-xl font-bold">
        <NavbarLink title="Home" href="#" />
        <NavbarLink title="About" href="#" />
        <NavbarLink title="Contact" href="#" />
        {isLoading ? (
          <div className="bg-gray-400 w-30 h-7 rounded-2xl animate-pulse"></div>
        ) : data ? (
          <NavbarLink title={data.user.username} href="/panel" />
        ) : (
          <NavbarLink title="Login / Register" href="/login" />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
