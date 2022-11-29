const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const User = mongoose.model("users");
const Schedule = mongoose.model("schedules");

const getWeekNumber = (curDay) => {
  const curWeekDay = curDay.getDay();
  const curDayOfMonth = curDay.getDate();
  // const firstDayOfWeek = curDayOfMonth - curWeekDay;
  const totalDaysTillNow = curDay - new Date(curDay.getFullYear(), 0, 1);
  return Math.ceil(
    (Math.ceil(totalDaysTillNow / 24 / 60 / 60 / 1000) - curWeekDay) / 7
  );
};

const startAndEndDayOfWeek = (curDay) => {
  const curWeekDay = curDay.getDay();
  const firstDay = curDay.setDate(curDay.getDate() - curWeekDay);
  const lastDay = curDay.setDate(curDay.getDate() + 6);
  return {
    startDay: new Date(firstDay).toLocaleDateString("en-GB"),
    endDay: new Date(lastDay).toLocaleDateString("en-GB"),
  };
};

module.exports = (app) => {
  app.post("/api/schedule/status", async (req, res) => {
    const { status } = req.body;
    req.user.status = status;
    await req.user.save();
    res.send(req.user);
  });

  app.get("/api/schedule/", async (req, res) => {
    const userEmail = req.query.email;
    const curDay = new Date();
    const curWeek = getWeekNumber(curDay);
    const curYear = curDay.getFullYear();
    const schedule = await Schedule.findOne({
      week: curWeek,
      year: curYear,
      email: userEmail,
    });

    res.send(schedule);
  });

  app.post("/api/schedule/submit", async (req, res) => {
    const { days } = req.body;
    console.log(days);
    const curDay = new Date();
    const curWeek = getWeekNumber(curDay);
    const curYear = curDay.getFullYear();
    const { startDay, endDay } = startAndEndDayOfWeek(curDay);

    let schedule = await Schedule.findOneAndUpdate(
      {
        week: curWeek,
        year: curYear,
        doctor_id: req.user.id,
      },
      {
        $set: { days: days },
      }
    ).exec();

    if (schedule) {
      return res.send({});
    }

    const name = `${req.user.firstName} ${req.user.lastName}`;

    schedule = new Schedule({
      week: curWeek,
      year: curYear,
      doctor_id: req.user.id,
      name,
      email: req.user.email,
      startDate: startDay,
      endDate: endDay,
      days,
    }).save();

    res.send({});
  });
};
