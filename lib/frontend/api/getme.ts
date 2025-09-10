import axios from "axios";

const BASE_URL = "/api/auth/me";

export const getmeApi = () =>
  axios.get(BASE_URL).then((res) => ({ data: res.data, status: res.status }));
