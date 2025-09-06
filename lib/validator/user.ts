import { SigninType, SignupType } from "@/type/user";
import { rules } from "./rules";

export const signupValidate = ({
  name,
  username,
  email,
  password,
  confirmPassword,
}: SignupType) => {
  console.log(rules.min.validate(username, 5));
  if (!rules.min.validate(name, 3)) return rules.min.message("name", 3);
  if (!rules.max.validate(name, 12)) return rules.max.message("name", 12);
  if (!rules.min.validate(username, 5)) return rules.min.message("username", 5);
  if (!rules.max.validate(username, 12))
    return rules.max.message("username", 12);
  if (!rules.email.validate(email)) return rules.email.message;
  if (!rules.password.validate(password)) return rules.password.message;
  if (password !== confirmPassword) {
    return "Repeating the password is not the same as the password.";
  }
  return true;
};

export const signinValidate = ({ identifier, password }: SigninType) => {
  if (!rules.min.validate(identifier, 5) && !rules.email.validate(identifier)) {
    return "Please enter a valid Email or a Username with at least 5 characters";
  }
  if (!rules.password.validate(password)) {
    return rules.password.message;
  }
  return true;
};
