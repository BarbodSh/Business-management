import { NextResponse } from "next/server";
import projectModel from "@/models/project";
import { ProjectType, ProjectUpdateType } from "@/lib/type/project";
import taskModel from "@/models/task";

export const getAllProject = async () => {
  const projects = await projectModel.find();
  return NextResponse.json(
    { message: "projects get successfully", projects },
    { status: 200 }
  );
};

export const getSignleProject = async (id: string) => {
  const project = await projectModel
    .findOne({ _id: id })
    .populate("creator", "username")
    .populate("members", "username")
    .populate("tasks", "title status priority");
  if (!project) {
    return NextResponse.json({ message: "project not found" }, { status: 404 });
  }
  return NextResponse.json(
    { message: "project get successfully", project },
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

export const removeProject = async (id: string) => {
  const deleteProject = await projectModel.findOneAndDelete({ _id: id });
  if (!deleteProject) {
    return NextResponse.json({ message: "project not found" }, { status: 404 });
  }

  await taskModel.deleteMany({ project: id });

  return NextResponse.json(
    { message: "projects delete successfully", title: deleteProject.title },
    { status: 200 }
  );
};

export const updateProject = async (body: ProjectUpdateType, id: string) => {
  const { title, description, status, dueDate, priority } = body;
  const changeProject = await projectModel.findOneAndUpdate(
    { _id: id },
    {
      title,
      description,
      status,
      dueDate,
      priority,
    }
  );

  if (!changeProject) {
    return NextResponse.json({ message: "project not found" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "projects update successfully", title },
    { status: 200 }
  );
};

export const addMember = async (body: { membersId: string[] }, id: string) => {
  const { membersId } = body;
  const findProject = await projectModel.findOne({ _id: id });
  if (!findProject) {
    return NextResponse.json({ message: "project not found" }, { status: 404 });
  }

  await projectModel.updateOne(
    { _id: id },
    { $addToSet: { members: { $each: membersId } } }
  );

  return NextResponse.json(
    { message: "member add is successfully" },
    { status: 200 }
  );
};

export const removeMember = async (
  body: { membersId: string[] },
  id: string
) => {
  const { membersId } = body;
  const findProject = await projectModel.findOne({ _id: id });
  if (!findProject) {
    return NextResponse.json({ message: "project not found" }, { status: 404 });
  }

  await projectModel.updateOne(
    { _id: id },
    { $pull: { members: { $in: membersId } } }
  );

  return NextResponse.json(
    { message: "member remove is successfully" },
    { status: 200 }
  );
};
