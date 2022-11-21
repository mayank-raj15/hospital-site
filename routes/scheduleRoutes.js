const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const User = mongoose.model("users");

module.exports = (app) => {
  app.post("/api/schedule/status", async (req, res) => {
    const { status } = req.body;
    req.user.status = status;
    await req.user.save();
    res.send(req.user);
  });
};
