const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  week: Number,
  userEmail: String,
  doctorEmail: String,
  userName: String,
  doctorName: String,
  date: String,
  scheduleId: {
    type: Schema.Types.ObjectId,
    ref: "Schedule",
    default: null,
  },
  day: String,
  timeSlot: String,
  description: String,
});

mongoose.model("appointments", appointmentSchema);
