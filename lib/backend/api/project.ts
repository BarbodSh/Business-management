import { NextResponse } from "next/server";
import projectModel from "@/models/project";
import { ProjectType } from "@/lib/type/project";

export const getAllProject = async () => {
  const users = await projectModel.find();
  return NextResponse.json(
    { message: "projects get successfully", users },
    { status: 200 }
  );
};

export const createProject = async (body: ProjectType, creator: string) => {
  const { title, description, members, dueDate, priority } = body;

  const project = await projectModel.create({
    title,
    description,
    creator,
    members: members || [],
    tasks: [],
    dueDate: dueDate || null,
    priority: priority || "Medium",
  });

  return NextResponse.json(
    { message: "project created successfully", project },
    { status: 201 }
  );
};
