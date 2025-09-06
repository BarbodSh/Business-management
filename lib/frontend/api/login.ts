import { SigninType } from "@/lib/type/user";
import axios from "axios";

const BASE_URL = "/api/auth/signin";

export const loginApi = (data: SigninType) =>
  axios.post(BASE_URL, data).then((res) => ({
    data: res.data,
    status: res.status,
  }));
