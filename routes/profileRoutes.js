const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");

module.exports = (app) => {
  app.post("/api/profile", async (req, res) => {
    Object.keys(req.body).forEach((key) => {
      if (key != "email") req.user[key] = req.body[key];
    });

    const user = await req.user.save();
    res.send(user);
  });
};
