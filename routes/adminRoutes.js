const requireAdminRights = require("../middlewares/requireAdminRights");
const mongoose = require("mongoose");
const activities = require("../config/activities");
const User = mongoose.model("users");
const Activity = mongoose.model("activities");

module.exports = (app) => {
  app.get("/api/admin", requireAdminRights, (req, res) => {
    res.send("Admin profile here");
  });

  app.post("/api/admin/role", requireAdminRights, async (req, res) => {
    const { email, role } = req.body;
    const affectedUser = await User.findOne({ email: email }, "role");
    const prevRole = affectedUser.role;
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
    const desc = `${activities.roleUpdation} ${prevRole} to ${role} by ${req.user.email}`;
    new Activity({
      userEmail: email,
      description: desc,
      otherEmail: req.user.email,
    }).save();
    res.send(req.user);
  });

  app.get("/api/activities", async (req, res) => {
    const activities = await Activity.find({});
    res.send(activities);
  });
};
