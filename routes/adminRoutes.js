const requireAdminRights = require("../middlewares/requireAdminRights");
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (app) => {
  app.get("/api/admin", requireAdminRights, (req, res) => {
    res.send("Admin profile here");
  });

  app.post("/api/admin/role", requireAdminRights, (req, res) => {
    const { email, role } = req.body;
    User.updateOne(
      {
        email: email,
      },
      {
        role: role,
        _assignedBy: req.user.id,
        assignedDate: new Date(),
      }
    ).exec();
    res.send(req.user);
  });
};
