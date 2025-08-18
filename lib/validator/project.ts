import { rules } from "./rules";

export const projectValidate = (title: string, description: string) => {
  if (!rules.min.validate(title, 5)) return rules.min.message("title", 5);
  if (!rules.max.validate(title, 30)) return rules.max.message("title", 30);
  if (!rules.min.validate(description, 5)) {
    return rules.min.message("description", 10);
  }
  if (!rules.max.validate(description, 30)) {
    return rules.max.message("description", 1000);
  }
  return true;
};
