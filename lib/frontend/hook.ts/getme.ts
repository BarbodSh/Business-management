import { useQuery } from "@tanstack/react-query";
import { getmeApi } from "../api/getme";

export const useGetme = () => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await getmeApi();
      return res.data;
    },
  });
};
