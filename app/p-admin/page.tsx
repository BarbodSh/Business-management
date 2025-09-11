import Link from "next/link";
import React from "react";
import { LuLogOut } from "react-icons/lu";

export default function page() {
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-12 justify-between content-center gap-5 p-10">
          <div className="col-span-4 bg-gray-500 flex flex-col justify-center items-start gap-2 p-3 rounded-lg text-xl font-bold">
            <div className="border-b-3 border-b-white pb-1 flex justify-between items-center w-full">
              <div className="text-3xl">Barbod</div>
              <LuLogOut className="text-3xl hover:text-red-600 transition-all duration-200 ease-in cursor-pointer" />
            </div>
            <Link href="#" className="relative group">
              <span className="group-hover:text-white group-hover:translate-x-9 transition-all duration-200 ease-in block">
                Home
              </span>
              <div className="absolute top-3 left-0 w-0 h-1.5 bg-white rounded-2xl group-hover:w-8 transition-all duration-200 ease-in"></div>
            </Link>
            <Link href="#" className="relative group">
              <span className="group-hover:text-white group-hover:translate-x-9 transition-all duration-200 ease-in block">
                User
              </span>
              <div className="absolute top-3 left-0 w-0 h-1.5 bg-white rounded-2xl group-hover:w-8 transition-all duration-200 ease-in"></div>
            </Link>
            <Link href="#" className="relative group">
              <span className="group-hover:text-white group-hover:translate-x-9 transition-all duration-200 ease-in block">
                Project
              </span>
              <div className="absolute top-3 left-0 w-0 h-1.5 bg-white rounded-2xl group-hover:w-8 transition-all duration-200 ease-in"></div>
            </Link>
            <Link href="#" className="relative group">
              <span className="group-hover:text-white group-hover:translate-x-9 transition-all duration-200 ease-in block">
                Task
              </span>
              <div className="absolute top-3 left-0 w-0 h-1.5 bg-white rounded-2xl group-hover:w-8 transition-all duration-200 ease-in"></div>
            </Link>
          </div>
          <div className="col-span-8 bg-gray-500 p-3 rounded-lg">hgsf</div>
        </div>
      </div>
    </section>
  );
}
