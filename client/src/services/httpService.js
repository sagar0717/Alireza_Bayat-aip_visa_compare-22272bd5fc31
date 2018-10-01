import axios from "axios";

import config from "../config.json";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;
  if (!expectedError) {
    // console.log("Error log:", error);
    // const errorStatis = error.response.status;
    // alert(`An unexpected error occurred.`);
    toast.error(`An unexpected error occurred. Please try again later`);

    // toast("hfohewofh");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  let instance = axios.create({
    baseURL: config.apiEndPoint
  });
  instance.defaults.headers.common["x-auth-token"] = jwt;
}
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
