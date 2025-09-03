"use client";
import WaveCanvas from "@/components/modules/canvas/waveCancas";
import Navbar from "@/components/modules/navbar/navbar";
import React from "react";

export default function BackGround() {
  return (
    <div className="relative h-100 w-full overflow-hidden">
      <WaveCanvas />
      <Navbar />
    </div>
  );
}
