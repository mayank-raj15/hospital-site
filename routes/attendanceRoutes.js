const requireLogin = require("../middlewares/requireLogin");
const requireAdminRights = require("../middlewares/requireAdminRights");
const requireCoordinatorRights = require("../middlewares/requireCoordinatorRights");
const requireDoctorRights = require("../middlewares/requireDoctorRights");
const mongoose = require("mongoose");
const crypto = require("crypto");
const { rest, last, values, get } = require("lodash");
const { time } = require("console");
const User = mongoose.model("users");
const Attendance = mongoose.model("attendances");

const generateRandomCode = () => {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
};

const getTodayDate = () => {
  return new Date().toLocaleDateString("en-GB");
};

module.exports = (app) => {
  app.get(
    "/api/attendance/generate",
    requireCoordinatorRights,
    async (req, res) => {
      const dateToday = getTodayDate();

      // getting list of doctors
      const doctorsList = await User.find({ role: "doctor" }, [
        "firstName",
        "lastName",
        "email",
        "attendance",
      ]);

      // generating codes for each, creating the final doctors array
      const doctors = doctorsList.map(({ firstName, lastName, email, _id }) => {
        const name = `${firstName} ${lastName}`;
        return {
          doctor_id: _id,
          name,
          email,
          code: generateRandomCode(),
        };
      });

      const dayAttendance = await Attendance.findOne({ day: dateToday });
      if (dayAttendance) return res.send([dayAttendance]);

      // creating a new attendance document
      const attendance = await new Attendance({
        day: dateToday,
        doctors,
      }).save();

      // adding the current day to each of the doctor's user document
      const dc = await User.updateMany(
        { role: "doctor" },
        {
          $push: {
            attendance: {
              $each: [{ day: dateToday }],
              $position: 0,
            },
          },
        },
        { multi: true }
      ).exec();

      res.send([attendance]);
    }
  );

  app.get(
    "/api/attendance/coordinator",
    requireCoordinatorRights,
    async (req, res) => {
      const dateToday = getTodayDate();
      const response = await Attendance.findOne({ day: dateToday });
      if (response) return res.send([response]);
      res.send([]);
    }
  );

  app.post("/api/attendance/doctor", requireDoctorRights, async (req, res) => {
    const codeProvided = req.body.code;
    const dateToday = getTodayDate();
    const timestamp = new Date();

    // setting present to true and adding timestamp to attendance document for the day
    const doctor = await Attendance.findOneAndUpdate(
      {
        day: dateToday,
        doctors: {
          $elemMatch: { doctor_id: req.user.id, code: codeProvided },
        },
      },
      {
        $set: { "doctors.$.present": true, "doctors.$.timestamp": timestamp },
      }
    ).exec();

    if (!doctor) {
      return res.status(401).send({ error: "Invalid Code" });
    }

    // updating timestamp for the current day
    req.user.attendance[0].timestamp = timestamp;

    const user = await req.user.save();

    res.send(user);
  });

  app.get("/api/attendance/admin", requireAdminRights, async (req, res) => {
    const doctorsList = await User.find({ role: "doctor" }, [
      "firstName",
      "lastName",
      "email",
      "attendance",
    ]);
    res.send(doctorsList);
  });
};
