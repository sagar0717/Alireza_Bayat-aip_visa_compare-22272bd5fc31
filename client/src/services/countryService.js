import http from "./httpService";
import config from "../config.json";

const apiEndPoint = `${config.apiEndPoint}/countries`;

export function setCountry(userData) {
  return http
    .post(apiEndPoint, userData)
    .then((window.location = "/admin/countries"));
}

export function updateCountry(userData, countryId) {
  return http
    .put(`${apiEndPoint}/${countryId}`, userData)
    .then((window.location = "/admin/countries"));
}

export function deleteCountries(id) {
  return http.delete(`${apiEndPoint}/${id}`);
}

export function getCountries() {
  // const countries = await http.get(apiEndPoint).then(response =>
  //   response.data.map(country => ({
  //     id: `${country._id}`,
  //     countryName: `${country.countryName}`
  //   }))
  // );
  // return { countries };
  return http.get(apiEndPoint);
}

export function getCounries() {
  return [
    { id: 1, county: "New Zealand" },
    { id: 2, county: "UK" },
    { id: 3, county: "China" },
    { id: 4, county: "India" },
    { id: 5, county: "Iran" }
  ];
}
