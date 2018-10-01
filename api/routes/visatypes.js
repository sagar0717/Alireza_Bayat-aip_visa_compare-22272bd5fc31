const express = require("express");
const router = express.Router();

const { VisaType } = require("../models/visatype");

router.get("/", (req, res, next) => {
  VisaType.find()
    .then(visatype => {
      // console.log(visatype);
      res.status(200).json(visatype);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Visa Type content can not be empty"
    });
  }
  const visatype = new VisaType({
    visaGroup: req.body.visaGroup,
    visaSubClass: req.body.visaSubClass,
    description: req.body.description
  });
  visatype
    .save()
    .then(result => {
      // console.log(result);
      res.status(201).json({
        message: "New Visa Type Successfully added",
        createdVisaType: result
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

router.put("/:visatypeid", (req, res) => {
  console.log("body", req.body);
  // Validate Request
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Visa Type content can not be empty"
    });
  }

  VisaType.findByIdAndUpdate(
    req.params.visatypeid,
    req.body,
    // {
    //   visaGroup: req.body.visaGroup,
    //   visaSubClass: req.body.visaSubClass,
    //   description: req.body.description
    // },
    { new: true }
  )
    .then(visatype => {
      if (!visatype) {
        return res.status(404).send({
          message: "Visa Type Record not found with id " + req.params.visatypeid
        });
      }
      res.send(visatype);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Visa Type Record not found with id " + req.params.visatypeid
        });
      }
      return res.status(500).send({
        message:
          "Error updating Visa Type Record with id " + req.params.visatypeid
      });
    });
});

router.delete("/:visatypeid", (req, res) => {
  var id = req.params.visatypeid;
  console.log(id);
  VisaType.findByIdAndRemove(req.params.visatypeid)
    .then(visatype => {
      if (!visatype) {
        return res.status(404).send({
          message: "Data not found with id " + req.params.visatype
        });
      }
      res.status(200).send({ message: "Data deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Data not found with id " + req.params.visatype
        });
      }
      return res.status(500).send({
        message: "Could not delete Data with id " + req.params.visatype
      });
    });
});

module.exports = router;
