import { rules } from "./rules";

export const validateId = (id: string) => {
  if (!rules.objectId.validate(id)) {
    return false;
  }
  return true;
};
