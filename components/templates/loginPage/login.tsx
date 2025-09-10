"use client";
import Input from "@/modules/userInput/input";
import { useLoginMember } from "@/lib/frontend/hook.ts/login";
import { signinValidate } from "@/validator/user";
import Link from "next/link";
import React, { useState } from "react";
import { SigninType } from "@/type/user";
import { showErrorSwal } from "@/lib/frontend/utils/helper";
import WaveCanvas from "@/components/modules/canvas/waveCancas";

function Login() {
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginMutation = useLoginMember();
  const LoginClickHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginData: SigninType = {
      identifier,
      password,
    };
    const validate = signinValidate(loginData);
    if (validate !== true) {
      return showErrorSwal(validate);
    }
    loginMutation.mutate(loginData);
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
            Wellcome back :)
          </span>
          <Input
            name="identifier"
            placeholder="email or username ..."
            id="identifier-input"
            labelName="Email or Username :"
            value={identifier}
            setValue={setIdentifier}
          />
          <Input
            name="password"
            placeholder="password ..."
            id="password-input"
            labelName="password :"
            value={password}
            setValue={setPassword}
          />
          <button
            disabled={loginMutation.isPending}
            type="submit"
            className={`p-2 mt-3 border-1 border-gray-900 w-full font-bold text-xl rounded-xl cursor-pointer hover:text-white hover:border-white transition-all duration-200 ease-in ${
              loginMutation.isPending ? "text-white border-white" : null
            }`}
          >
            {loginMutation.isPending ? "Loging ..." : "Login"}
          </button>
        </form>
        <div className="flex flex-col justify-center items-center gap-5 w-full">
          <Link
            href="/register"
            className="opacity-60 cursor-pointer hover:text-white hover:opacity-100 transition duration-200 ease-in"
          >
            create new account
          </Link>
          <span className="-mt-5 opacity-60 cursor-pointer hover:text-white hover:opacity-100 transition duration-200 ease-in">
            forgot my password
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
