function isAdmin(req, res, next) {
  if (!req.applicant.isAdmin) return res.status(403).send("Access denied.");
  next();
}
