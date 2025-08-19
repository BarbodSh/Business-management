import { NextResponse } from "next/server";
import taskModel from "@/models/task";
import projectModel from "@/models/project";
import userModel from "@/models/user";
import { TaskType, TaskUpdateType } from "@/type/task";
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

export const updateTask = async (body: TaskUpdateType, id: string) => {
  const updateTask = await taskModel.findOneAndUpdate({ _id: id }, body);
  if (!updateTask) {
    return NextResponse.json({ message: "task is not found" }, { status: 404 });
  }
  return NextResponse.json(
    { message: "update task is successfully" },
    { status: 200 }
  );
};

export const removeTask = async (id: string) => {
  const findTask = await taskModel.findOne({ _id: id });
  if (!findTask) {
    return NextResponse.json({ message: "task is not found" }, { status: 404 });
  }
  const rmeoveTaskFromProject = await projectModel.findOneAndUpdate(
    { _id: findTask.project },
    { $pull: { tasks: id } }
  );
  if (!rmeoveTaskFromProject) {
    return NextResponse.json(
      { message: "project is not found" },
      { status: 404 }
    );
  }
  await taskModel.deleteOne({ _id: id });

  return NextResponse.json(
    { message: "delete task is successfully" },
    { status: 200 }
  );
};

export const updateStatusTask = async (
  body: { status: string },
  taskId: string,
  userId: string
) => {
  const isAccess = await taskModel.findOne({
    _id: taskId,
    $or: [{ creator: userId }, { assignee: userId }],
  });
  if (!isAccess) {
    return NextResponse.json(
      { message: "you cant access this api" },
      { status: 403 }
    );
  }
  await taskModel.findOneAndUpdate({ _id: taskId }, { status: body.status });
  return NextResponse.json(
    { message: "status update is successfully" },
    { status: 200 }
  );
};
