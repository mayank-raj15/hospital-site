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

  app.post("/api/schedule/submit", async (req, res) => {
    const { days } = req.body;
    const curDay = new Date();
    const curWeek = getWeekNumber(curDay);
    const { startDay, endDay } = startAndEndDayOfWeek(curDay);

    let schedule = await Schedule.findOneAndUpdate(
      {
        week: curWeek,
        doctor_id: req.user.id,
      },
      {
        $set: { days: days },
      }
    ).exec();

    if (schedule) {
      return res.send([schedule.days]);
    }

    const name = `${req.user.firstName} ${req.user.lastName}`;

    schedule = new Schedule({
      week: curWeek,
      doctor_id: req.user.id,
      name,
      email: req.user.email,
      startDate: startDay,
      endDate: endDay,
      days,
    }).save();

    res.send([schedule.days]);
  });
};
