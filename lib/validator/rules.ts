import mongoose from "mongoose";

export const rules: Record<string, any> = {
  required: {
    validate: (value: any) =>
      value !== undefined && value !== null && String(value).trim() !== "",
    message: (name: string) => `${name} is required`,
  },
  min: {
    validate: (value: string | number, length: number) =>
      typeof value === "number"
        ? value >= length
        : String(value).trim().length >= length,
    message: (name: string, length: number, isNumber: boolean = false) =>
      isNumber
        ? `${name} must be at least ${length}.`
        : `${name} must be at least ${length} characters long.`,
  },
  max: {
    validate: (value: string | number, length: number) =>
      typeof value === "number"
        ? value <= length
        : String(value).trim().length <= length,
    message: (name: string, length: number, isNumber: boolean = false) =>
      isNumber
        ? `${name} must be at maximum of ${length}.`
        : `${name} must be a maximum of ${length} characters.`,
  },
  objectId: {
    validate: (value: string) => mongoose.Types.ObjectId.isValid(value),
  },
  email: {
    validate: (value: string) =>
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
    message: "This email is not valid.",
  },
  password: {
    validate: (value: string) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(value),
    message:
      "This password must be at least 8 characters and include uppercase, lowercase, and a number.",
  },
  onlyLetters: {
    validate: (value: string) => /^[a-zA-Z]+$/.test(value),
    message: "this field accepts letter only.",
  },

  onlyNumbers: {
    validate: (value: string) => /^\d+$/.test(value),
    message: "This field accepts number only.",
  },
};
