import { TaskType, TaskUpdateType } from "../type/task";
import { rules } from "./rules";

export const taskValidate = ({
  title,
  description,
  creator,
  assignee,
  priority,
  project,
  dueDate,
}: TaskType) => {
  if (!rules.min.validate(title, 5)) return rules.min.message("title", 5);
  if (!rules.max.validate(title, 30)) return rules.max.message("title", 30);
  if (!rules.min.validate(description, 10)) {
    return rules.min.message("description", 10);
  }
  if (!rules.max.validate(description, 30)) {
    return rules.max.message("description", 1000);
  }
  if (!rules.objectId.validate(creator)) return "creator data is not valid";
  if (!rules.objectId.validate(assignee)) return "assignee data is not valid";
  if (!rules.objectId.validate(project)) return "project data is not valid";
  if (!rules.required.validate(priority)) {
    return rules.required.message("priority");
  }
  if (!rules.required.validate(dueDate)) {
    return rules.required.message("dueDate");
  }
  return true;
};

export const taskUpdateValidate = ({
  title,
  description,
  priority,
  dueDate,
}: TaskUpdateType) => {
  if (!rules.min.validate(title, 5)) return rules.min.message("title", 5);
  if (!rules.max.validate(title, 30)) return rules.max.message("title", 30);
  if (!rules.min.validate(description, 10)) {
    return rules.min.message("description", 10);
  }
  if (!rules.max.validate(description, 30)) {
    return rules.max.message("description", 1000);
  }
  if (!rules.required.validate(priority)) {
    return rules.required.message("priority");
  }
  if (!rules.required.validate(dueDate)) {
    return rules.required.message("dueDate");
  }
  return true;
};
