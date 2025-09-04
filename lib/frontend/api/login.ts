import axios from "axios";

const BASE_URL = "/api/auth/signin";

export const postApi = (data: Record<string, any>) =>
  axios.post(BASE_URL, data).then((res) => ({
    data: res.data,
    status: res.status,
  }));
