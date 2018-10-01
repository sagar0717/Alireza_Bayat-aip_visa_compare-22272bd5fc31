const auth = require("../../middleware/auth");
// const bcrypt = require("bcrypt");
const bcrypt = require("bcryptjs");
const Applicant = require("../models/applicant");
const { Validate } = require("../models/applicant");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = Validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let applicant = await Applicant.findOne({ email: req.body.email });
    if (applicant) {
      return res.status(400).send(`user ${applicant.email} already exist`);
    } else {
      const salt = 10;
      const hash = await bcrypt.hash(req.body.password, salt);
      applicant = new Applicant({
        userName: req.body.userName,
        email: req.body.email,
        password: hash
      });
    }
    try {
      applicant.save();
      const token = applicant.generateAuthToken();
      res
        .status(201)
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "content-type,x-auth-token")
        .send({
          email: applicant.email,
          userName: applicant.username,
          _id: applicant._id
        });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  } catch (err) {
    res.status(500).json({
      error: err
    });
  }

  // Applicant.findOne({ email: req.body.email })
  //   .then((applicant, reject) => {
  //     if (!applicant) {
  //       const salt = 10;
  //       bcrypt.hash(req.body.password, salt, (err, hash) => {
  //         const applicant = new Applicant({
  //           userName: req.body.userName,
  //           email: req.body.email,
  //           password: hash
  //         });
  //         applicant
  //           .save()
  //           .then(applicant => {
  //             const token = applicant.generateAuthToken();
  //             res
  //               .status(201)
  //               .header("x-auth-token", token)
  //               .header("access-control-expose-headers", "x-auth-token") //To let the client read the custom header
  //               .send({
  //                 email: applicant.email,
  //                 userName: applicant.userName,
  //                 _id: applicant._id
  //               });
  //           })
  //           .catch(err => {
  //             res.status(500).json({
  //               error: err
  //             });
  //           });
  //       });
  //     } else
  //       return res.status(400).send(`user ${applicant.email} already exist`);
  //   })
  //   .catch(err => {
  //     res.status(500).json({
  //       error: err
  //     });
  //   });
});

router.get("/", auth, (req, res) => {
  Applicant.find()
    .select("email")
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/me", auth, async (req, res) => {
  const applicant = await Applicant.findById(req.applicant._id).select(
    "-password"
  );
  res.send(applicant);
});
module.exports = router;
