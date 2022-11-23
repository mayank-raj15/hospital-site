module.exports = (req, res, next) => {
  if (!req.user || req.user.role !== "doctor") {
    return res.status(404).send({ error: "URL not found" });
  }
  next();
};
