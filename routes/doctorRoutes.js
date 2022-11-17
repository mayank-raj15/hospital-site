const requireAdminRights = require("../middlewares/requireAdminRights");
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (app) => {
  app.get("/api/doctors", async (req, res) => {
    const doctors = await User.find({ role: "doctor" });
    res.send(doctors);
  });
};
