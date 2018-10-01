import http from "./httpService";
import config from "../config.json";

const apiEndPoint = `${config.apiEndPoint}/applicants`;

export async function register(applicant) {
  return http.post(apiEndPoint, {
    userName: applicant.name,
    email: applicant.username,
    password: applicant.password
  });
}
