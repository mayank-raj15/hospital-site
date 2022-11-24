const requireAdminRights = require("../middlewares/requireAdminRights");
const mongoose = require("mongoose");
const activities = require("../config/activities");
const User = mongoose.model("users");
const Activity = mongoose.model("activities");

module.exports = (app) => {
  app.get("/api/admin", requireAdminRights, (req, res) => {
    res.send("Admin profile here");
  });

  app.get("/api/admin/userDetails", requireAdminRights, async (req, res) => {
    const userEmail = req.query.email;
    console.log(userEmail);
    const user = await User.findOne({ email: userEmail }, "role");
    console.log(user);
    res.send(user);
  });

  app.post("/api/admin/role", requireAdminRights, async (req, res) => {
    const { email, role } = req.body;
    console.log(email, role);
    const affectedUser = await User.findOne({ email: email }, "role");
    if (!affectedUser) return res.status(400).send({ error: "User not found" });
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
