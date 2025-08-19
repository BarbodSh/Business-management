import { NextResponse } from "next/server";
import taskModel from "@/models/task";
import projectModel from "@/models/project";
import userModel from "@/models/user";
import { TaskType } from "@/type/task";
import { findInModelWithId } from "../utils/helper";

export const getAllTask = async () => {
  const tasks = await taskModel.find();
  return NextResponse.json(
    { message: "tasks get successfully", tasks },
    { status: 200 }
  );
};

export const getTaskByProject = async (projectId: string) => {
  const findTask = await taskModel.find({ project: projectId });
  if (findTask.length === 0) {
    return NextResponse.json({ message: "task is not found" }, { status: 404 });
  }
  return NextResponse.json(
    { message: "get task by project is successfully", tasks: findTask },
    { status: 200 }
  );
};

export const getTaskByUser = async (userId: string) => {
  const findTask = await taskModel.find({ assignee: userId });
  if (findTask.length === 0) {
    return NextResponse.json({ message: "task is not found" }, { status: 404 });
  }
  return NextResponse.json(
    { message: "get task by assignee is successfully", tasks: findTask },
    { status: 200 }
  );
};

export const createTask = async (body: TaskType) => {
  const { title, description, creator, assignee, priority, project, dueDate } =
    body;

  const [checkProject, checkCreator, checkassignee] = await Promise.all([
    findInModelWithId(projectModel, project),
    findInModelWithId(userModel, creator),
    findInModelWithId(userModel, assignee),
  ]);

  if (!checkProject) {
    return NextResponse.json(
      { message: "project is not found" },
      { status: 404 }
    );
  }

  if (!checkCreator) {
    return NextResponse.json(
      { message: "creator is not found" },
      { status: 404 }
    );
  }

  if (!checkassignee) {
    return NextResponse.json(
      { message: "assignee is not found" },
      { status: 404 }
    );
  }

  await taskModel.create({
    title,
    description,
    creator,
    assignee,
    priority,
    project,
    dueDate,
  });

  return NextResponse.json(
    { message: "task create is successfully" },
    { status: 201 }
  );
};
