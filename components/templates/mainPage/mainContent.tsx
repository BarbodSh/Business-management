"use client";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import { animate } from "motion";
export default function MainContent() {
  return (
    <section>
      <div className="container text-white text-3xl font-bold flex justify-center items-center gap-5 flex-col">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 100 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="text-center flex justify-between gap-10 items-center"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl h-60 w-200">
            <Image
              alt="chart-img"
              src="/image/chart.png"
              className="w-full h-full bg-cover"
              width={400}
              height={400}
            />
          </div>
          <span>
            Manage all your projects and team members in one place, streamline
            your workflow, and achieve your goals faster.
          </span>
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 100 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="text-center flex justify-between gap-10 items-center"
        >
          <span>
            Turn your ideas into successful projects with Project Manager – the
            ultimate tool to organize tasks, coordinate your team, and bring
            every project to life.
          </span>
          <div className="rounded-2xl overflow-hidden shadow-2xl h-60 w-200">
            <Image
              alt="chart-img"
              src="/image/team.png"
              className="w-full h-full bg-cover"
              width={400}
              height={400}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
