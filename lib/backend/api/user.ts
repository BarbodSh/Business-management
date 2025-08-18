import { SigninType, SignupType } from "@/type/user";
import userModel from "@/models/user";
import { NextResponse } from "next/server";
import {
  createHashPassword,
  createToken,
  verifyHashPassword,
} from "../utils/helper";
import { cookies } from "next/headers";

export const createUser = async (body: SignupType) => {
  const { name, username, email, password } = body;
  const cookiesStore = await cookies();

  const emailOrUsernameAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (emailOrUsernameAlreadyExist) {
    return NextResponse.json(
      { message: "data is already exist" },
      { status: 409 }
    );
  }

  const hashPassword = await createHashPassword(password);

  const userCount = await userModel.find();
  const newUser = await userModel.create({
    name,
    username,
    email,
    password: hashPassword,
    role: userCount.length <= 0 ? "Admin" : "Employee",
  });

  const token = createToken({ id: newUser._id, role: newUser.role });
  cookiesStore.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json(
    { message: "create user is successfully", username },
    { status: 201 }
  );
};

export const signinUser = async (body: SigninType) => {
  const { identifier, password } = body;
  const cookiesStore = await cookies();

  const checkUser = await userModel.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });
  if (!checkUser) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }

  const checkPassword = await verifyHashPassword(password, checkUser.password);
  if (!checkPassword) {
    return NextResponse.json({ message: "data is not valid" }, { status: 400 });
  }

  const token = createToken({ id: checkUser._id, role: checkUser.role });
  cookiesStore.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json(
    { message: "login is successfully" },
    { status: 200 }
  );
};

export const getAllUser = async () => {
  const users = await userModel.find();
  return NextResponse.json(
    { message: "users get successfully", users },
    { status: 200 }
  );
};

export const removeUser = async (id: string) => {
  const removeUser = await userModel.findOneAndDelete({ _id: id });
  if (!removeUser) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }
  return NextResponse.json(
    { message: "user delete is successfully", username: removeUser.username },
    { status: 200 }
  );
};

export const updateUser = async (body: SignupType, id: string) => {
  const { name, email, username, password } = body;

  const findUser = await userModel.findOne({ _id: id });
  if (!findUser) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }

  const checkPassword = await verifyHashPassword(password, findUser.password);
  if (!checkPassword) {
    return NextResponse.json(
      { message: "password not valid" },
      { status: 400 }
    );
  }

  const hashPassword = await createHashPassword(password);
  const changeUser = await userModel.findOneAndUpdate(
    { _id: id },
    { name, email, username, password: hashPassword }
  );

  return NextResponse.json(
    { message: "user update is successfully", username },
    { status: 200 }
  );
};

export const searchUser = async (body: { username: string }) => {
  const { username } = body;
  const findUser = await userModel.findOne({
    username: { $regex: username, $options: "i" },
  });
  return NextResponse.json(
    { message: "find User is successfully", findUser },
    { status: 200 }
  );
};
