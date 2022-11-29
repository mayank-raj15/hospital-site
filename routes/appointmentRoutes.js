const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const activities = require("../config/activities");
const Appointment = mongoose.model("appointments");
const Schedule = mongoose.model("schedules");
const Activity = mongoose.model("activities");

const getWeekNumber = (curDay) => {
  const curWeekDay = curDay.getDay();
  const curDayOfMonth = curDay.getDate();
  // const firstDayOfWeek = curDayOfMonth - curWeekDay;
  const totalDaysTillNow = curDay - new Date(curDay.getFullYear(), 0, 1);
  return Math.ceil(
    (Math.ceil(totalDaysTillNow / 24 / 60 / 60 / 1000) - curWeekDay) / 7
  );
};

module.exports = (app) => {
  app.get("/api/appointments", async (req, res) => {
    let appointments;
    const curDay = new Date();
    const curWeek = getWeekNumber(curDay);
    const role = req.user.role;
    console.log(req.user);
    if (role === "user") {
      appointments = await Appointment.find({
        userEmail: req.user.email,
        week: curWeek,
      });
    } else if (role == "coordinator" || role == "admin") {
      appointments = await Appointment.find({ week: curWeek });
    } else if (role == "doctor") {
      appointments = await Appointment.find({
        week: curWeek,
        doctorEmail: req.user.email,
      });
    }
    // console.log(appointments);

    if (appointments) res.send(appointments.reverse());
    else res.send([]);
  });

  app.post("/api/appointments/create", async (req, res) => {
    const {
      doctorName,
      doctorEmail,
      date,
      day,
      timeSlot,
      description,
      scheduleId,
      days,
      week,
    } = req.body;

    const schedule = await Schedule.updateOne(
      {
        _id: scheduleId,
      },
      {
        days,
      }
    ).exec();

    const userName = `${req.user.firstName} ${req.user.lastName}`;
    const appointment = await new Appointment({
      userEmail: req.user.email,
      doctorEmail,
      userName,
      doctorName,
      date: new Date(date),
      day,
      timeSlot,
      description,
      scheduleId,
      week,
    }).save();

    if (appointment) {
      const desc = `${activities.appointment} ${doctorEmail}`;
      const activity = await new Activity({
        userEmail: req.user.email,
        otherEmail: doctorEmail,
        description: desc,
      }).save();
    }
    res.send(req.user);
  });
};
