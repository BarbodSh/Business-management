import Link from "next/link";
import React from "react";

function NavbarLink({ title, href }: { title: string; href: string }) {
  return (
    <Link href={href} className="relative group">
      <span className="group-hover:text-sky-500 transition-all duration-200 ease-in">
        {title}
      </span>
      <div className="absolute -bottom-1 left-0 w-0 h-1 rounded-2xl bg-sky-500 group-hover:w-full transition-all duration-200 ease-in"></div>
    </Link>
  );
}

export default NavbarLink;
