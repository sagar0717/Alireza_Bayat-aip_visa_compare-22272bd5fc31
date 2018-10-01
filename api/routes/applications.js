const express = require("express");
const router = express.Router();
const { validate } = require("../models/application");
const Application = require("../models/application");
const auth = require("../../middleware/auth");

router.get("/", (req, res, next) => {
  Application.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:id", (req, res, next) => {
  Application.find({ applicantId: req.params.id })
    .exec()
    .then(application => {
      if (!application) {
        return res
          .status(404)
          .send("Application with the given id was not found");
      }
      res.status(200).json(application);
      // next();
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", auth, (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const application = new Application({
    visaSubclass: req.body.visaSubclass,
    visaLodgementDate: req.body.visaLodgementDate,
    country: req.body.country,
    applicantId: req.body.applicantId,
    caseOfficerAssigned: req.body.caseOfficerAssigned,
    caseOfficerAssignedOn: req.body.caseOfficerAssignedOn,
    MedicalCheckRequested: req.body.MedicalCheckRequested,
    MedicalRequestDate: req.body.MedicalRequestDate,
    // medicalDate: req.body.medicalDate,
    supplementaryDocumentsRequested: req.body.supplementaryDocumentsRequested,
    supplementaryDocsRequestDate: req.body.supplementaryDocsRequestDate,
    visaStatus: req.body.visaStatus,
    visaDecisionDate: req.body.visaDecisionDate,
    lastUpdated: req.body.lastUpdated
  });
  application
    .save()
    .then(result => {
      // console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /applications",
        createdApplication: result
      });
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({
        error: err
      });
    });

  // res.status(200).json({});
});

router.delete("/:id", (req, res) => {
  Application.deleteOne({ _id: req.params.id })
    .then(result => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(200).send("Application doesn't exist");
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;
