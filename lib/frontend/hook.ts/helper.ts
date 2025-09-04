import { useMutation } from "@tanstack/react-query";
import { postApi } from "../api/login";
import { showSuccessSwal } from "../utils/helper";
import { useRouter } from "next/navigation";
import axios from "axios";
import { allStatus } from "../utils/status";

export const useLoginMember = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: Record<string, any>) => postApi(data),
    onSuccess: (response) => {
      showSuccessSwal(`${response.data.username} login is successfully`, () => {
        router.push("/");
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          allStatus(error.response.status);
        } else {
          console.log("خطای شبکه یا timeout:", error.message);
        }
      } else {
        console.log("خطای دیگر:", error);
      }
    },
  });
};
