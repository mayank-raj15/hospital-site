const mongoose = require("mongoose");
const { Schema } = mongoose;

const dayScheduleSchema = new Schema({
  date: {
    type: Date,
    default: null,
  },
  day: String,
  dayStartHours: String,
  dayEndHours: String,
  dayStartMinutes: String,
  dayEndMinutes: String,
  breakStartHours: {
    type: String,
    default: "N/A",
  },
  breakEndHours: {
    type: String,
    default: "N/A",
  },
  breakStartMinutes: {
    type: String,
    default: "N/A",
  },
  breakEndMinutes: {
    type: String,
    default: "N/A",
  },
  availableTimeSlots: {
    type: [String],
    default: [],
  },
  bookedTimeSlots: {
    type: [String],
    default: [],
  },
});

const scheduleSchema = new Schema({
  week: Number,
  year: Number,
  startDate: String,
  endDate: String,
  doctor_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  email: String,
  name: String,
  days: [dayScheduleSchema],
});

mongoose.model("schedules", scheduleSchema);
