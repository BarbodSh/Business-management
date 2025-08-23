import { checkInType } from "@/type/attendance";
import attendanceModel from "@/models/attendance";
import userModel from "@/models/user";
import projectModel from "@/models/project";
import { NextResponse } from "next/server";
import { findInModelWithId, getDay } from "../utils/helper";
export const checkIn = async (body: checkInType) => {
  const { now, startOfDay, endOfDay } = getDay();
  const { userId, projectId } = body;

  const userFind = await findInModelWithId(userModel, userId);
  const projectFind = await findInModelWithId(projectModel, projectId);
  if (!userFind || !projectFind) {
    return NextResponse.json(
      { message: "project or user is not found" },
      { status: 404 }
    );
  }

  const findAttendance = await attendanceModel.findOne({
    user: userId,
    project: projectId,
    date: { $gte: startOfDay, $lt: endOfDay },
  });
  if (!findAttendance) {
    await attendanceModel.create({ user: userId, project: projectId });
    return NextResponse.json(
      { message: "attendance create is successfully" },
      { status: 201 }
    );
  }

  const activeSession = findAttendance.sessions.find(
    (session) => !session.checkOut
  );

  if (activeSession) {
    return NextResponse.json(
      { message: "you have already open attendance" },
      { status: 422 }
    );
  }

  await attendanceModel.updateOne(
    {
      user: userId,
      project: projectId,
      date: { $gte: startOfDay, $lt: endOfDay },
    },
    {
      $addToSet: {
        sessions: { checkIn: now },
      },
    }
  );
  return NextResponse.json(
    { message: "new check-in for this project successfully" },
    { status: 200 }
  );
};

export const checkOut = async (body: checkInType) => {
  const { now, startOfDay, endOfDay } = getDay();
  const { userId, projectId } = body;

  const userFind = await findInModelWithId(userModel, userId);
  const projectFind = await findInModelWithId(projectModel, projectId);
  if (!userFind || !projectFind) {
    return NextResponse.json(
      { message: "project or user is not found" },
      { status: 404 }
    );
  }

  const findAttendance = await attendanceModel.findOne({
    user: userId,
    project: projectId,
    date: { $gte: startOfDay, $lt: endOfDay },
  });
  if (!findAttendance) {
    return NextResponse.json(
      { message: "attendance is not found" },
      { status: 404 }
    );
  }

  const lastOpenSessionIndex = findAttendance.sessions.findLastIndex(
    (session) => !session.checkOut
  );

  if (lastOpenSessionIndex === -1) {
    return NextResponse.json(
      { message: "no active session found" },
      { status: 422 }
    );
  }

  const checkInTime = findAttendance.sessions[lastOpenSessionIndex].checkIn;
  const duration = now.getTime() - checkInTime.getTime();

  findAttendance.sessions[lastOpenSessionIndex].checkOut = now;
  findAttendance.sessions[lastOpenSessionIndex].duration = duration;

  await findAttendance.save();
  return NextResponse.json(
    { message: "check-out successfully", duration },
    { status: 200 }
  );
};

export const getAttendanceInMonth = async (userId: string) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const userFind = await findInModelWithId(userModel, userId);
  if (!userFind) {
    return NextResponse.json({ message: "user is not found" }, { status: 404 });
  }

  const months = [
    {
      month: currentMonth - 2,
      year: currentMonth - 2 < 0 ? currentYear - 1 : currentYear,
    },
    {
      month: currentMonth - 1,
      year: currentMonth - 1 < 0 ? currentYear - 1 : currentYear,
    },
    { month: currentMonth, year: currentYear },
  ];
  const report: { month: string; totalHours: number; days: {}[] }[] = [];
  for (const m of months) {
    const startDate = new Date(m.year, m.month, 1);
    const endDate = new Date(m.year, m.month + 1, 1);

    const attendances = await attendanceModel.find({
      user: userId,
      date: { $gte: startDate, $lt: endDate },
    });

    let totalDuration = 0;
    attendances.forEach((att) => {
      att.sessions.forEach((session) => {
        if (session.duration) totalDuration += session.duration;
      });
    });

    report.push({
      month: `${m.year}-${m.month + 1}`,
      totalHours: totalDuration / (1000 * 60 * 60),
      days: attendances || [],
    });
  }

  return NextResponse.json(
    { message: "getAttendanceInMonth is successfully", report },
    { status: 200 }
  );
};

export const getAttendanceInProject = async (projectId: string) => {
  const projectFind = await findInModelWithId(projectModel, projectId);
  if (!projectFind) {
    return NextResponse.json(
      { message: "project is not found" },
      { status: 404 }
    );
  }

  const allAttendanceInProject = await attendanceModel.find({
    project: projectId,
  });
  return NextResponse.json(
    {
      message: "getAttendanceInProject is successfully",
      allAttendanceInProject,
    },
    { status: 200 }
  );
};
