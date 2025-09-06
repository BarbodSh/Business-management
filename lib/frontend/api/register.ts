import { SignupType } from "@/type/user";
import axios from "axios";

const BASE_URL = "/api/auth/signup";

export const registerApi = (data: SignupType) =>
  axios.post(BASE_URL, data).then((res) => ({
    data: res.data,
    status: res.status,
  }));
