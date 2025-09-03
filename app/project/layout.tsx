import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-12 justify-between content-center gap-5 mt-10">
          <div className="col-span-4 w-full h-60 bg-white/30 backdrop-blur-sm rounded-lg sticky top-10 left-0 p-5">
            <button className="rounded-lg mb-5 p-1 border-1 w-full font-bold text-xl cursor-pointer text-center border-sky-500 hover:text-white hover:bg-sky-500 transition duration-200 ease-in">
              Create Project
            </button>
            <div className="flex flex-col justify-center gap-3 items-start font-bold">
              <span className="text-xl">Your Project :</span>
              <div className="relative group">
                <span className="text-lg group-hover:text-white group-hover:translate-x-9 block transition-all duration-200 ease-in cursor-pointer">
                  GJTghgkdg
                </span>
                <div className="absolute top-3 left-0 h-1 w-0 opacity-0 rounded-2xl bg-white group-hover:w-6 group-hover:opacity-100 transition-all duration-300 ease-in"></div>
              </div>
              <div className="relative group">
                <span className="text-lg group-hover:text-white group-hover:translate-x-9 block transition-all duration-200 ease-in cursor-pointer">
                  lkhf
                </span>
                <div className="absolute top-3 left-0 h-1 w-0 opacity-0 rounded-2xl bg-white group-hover:w-6 group-hover:opacity-100 transition-all duration-300 ease-in"></div>
              </div>
            </div>
          </div>
          <div className="col-span-8 w-full">{children}</div>
        </div>
      </div>
    </section>
  );
}
