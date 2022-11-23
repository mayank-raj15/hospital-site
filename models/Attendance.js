const mongoose = require("mongoose");
const { Schema } = mongoose;

const doctorAttendanceSchema = new Schema({
  doctor_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  email: String,
  code: String,
  name: String,
  present: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: null,
  },
});

const attendanceSchema = new Schema({
  day: String,
  doctors: [doctorAttendanceSchema],
});

mongoose.model("attendances", attendanceSchema);
