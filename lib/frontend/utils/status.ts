import { showErrorSwal } from "./helper";

export const allStatus = (status: number) => {
  switch (status) {
    case 400:
      return showErrorSwal("data is not valid");

    case 404:
      return showErrorSwal("data is not found");

    case 422:
      return showErrorSwal("data is not valid");

    case 500:
      return showErrorSwal("server error");

    default:
      return showErrorSwal("unexpected error");
  }
};
