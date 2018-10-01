import http from "./httpService";
import config from "../config.json";

const apiEndPoint = `${config.apiEndPoint}/applications/`;

export function setVisaDetail(application) {
  return http.post(apiEndPoint, {
    visaSubclass: application.visaSubclass,
    visaLodgementDate: application.visaLodgementDate,
    country: application.country,
    applicantId: application.applicantId,
    caseOfficerAssigned: application.caseOfficerAssigned,
    caseOfficerAssignedOn: application.caseOfficerAssignedOn,
    MedicalCheckRequested: application.MedicalCheckRequested,
    MedicalRequestDate: application.MedicalRequestDate,
    supplementaryDocumentsRequested:
      application.supplementaryDocumentsRequested,
    supplementaryDocsRequestDate: application.supplementaryDocsRequestDate,
    visaStatus: application.visaStatus,
    visaDecisionDate: application.visaDecisionDate
  });
}

export function getVisaDetail(id) {
  return http.get(`${apiEndPoint}${id}`);
}

export function getApplications() {
  return http.get(apiEndPoint);
}

export function getVisaStatus() {
  return [
    { Id: 1, status: "Approved" },
    { Id: 2, status: "Rejected" },
    { Id: 3, status: "Pending" }
  ];
}

export function deletApplication(id) {
  return http.delete(`${apiEndPoint}${id}`);
}
