"use client";
import Input from "@/modules/userInput/input";
import { useLoginMember } from "@/lib/frontend/hook.ts/login";
import { signinValidate, signupValidate } from "@/validator/user";
import Link from "next/link";
import React, { useState } from "react";
import { SignupType } from "@/type/user";
import { showErrorSwal } from "@/lib/frontend/utils/helper";
import WaveCanvas from "@/components/modules/canvas/waveCancas";
import { useRegisterMember } from "@/lib/frontend/hook.ts/register";

function Register() {
  const [name, setName] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const registerMutation = useRegisterMember();

  const LoginClickHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const registerData: SignupType = {
      name,
      username,
      email,
      password,
      confirmPassword,
    };

    const validate = signupValidate(registerData);
    if (validate !== true) {
      return showErrorSwal(validate);
    }
    registerMutation.mutate(registerData);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex justify-center items-center">
      <WaveCanvas />
      <div className="flex flex-col justify-center items-start bg-white/30 backdrop-blur-md gap-2 p-5 rounded-xl w-100">
        <form
          onSubmit={LoginClickHandler}
          className="flex flex-col justify-center items-start gap-2 w-full"
        >
          <span className="font-bold text-3xl mb-4 text-center w-full">
            Nice to see you :)
          </span>
          <Input
            name="name"
            placeholder="name ..."
            id="name-input"
            labelName="Name :"
            value={name}
            setValue={setName}
          />
          <Input
            name="username"
            placeholder="username ..."
            id="username-input"
            labelName="Username :"
            value={username}
            setValue={setUsername}
          />
          <Input
            name="email"
            placeholder="email ..."
            id="email-input"
            labelName="Email :"
            value={email}
            setValue={setEmail}
          />
          <Input
            name="password"
            placeholder="password ..."
            id="password-input"
            labelName="Password :"
            value={password}
            setValue={setPassword}
          />
          <Input
            name="confirmPassword"
            placeholder="confirmPassword ..."
            id="confirmPassword-input"
            labelName="ConfirmPassword :"
            value={confirmPassword}
            setValue={setConfirmPassword}
          />
          <button
            disabled={registerMutation.isPending}
            type="submit"
            className={`p-2 mt-3 border-1 border-gray-900 w-full font-bold text-xl rounded-xl cursor-pointer hover:text-white hover:border-white transition-all duration-200 ease-in ${
              registerMutation.isPending ? "text-white border-white" : null
            }`}
          >
            {registerMutation.isPending ? "Registering ..." : "Register"}
          </button>
        </form>
        <div className="flex flex-col justify-center items-center gap-5 w-full">
          <Link
            href="/login"
            className="opacity-60 cursor-pointer hover:text-white hover:opacity-100 transition duration-200 ease-in"
          >
            i have already account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
