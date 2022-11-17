const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  dob: {
    type: Date,
    default: undefined,
  },
  phoneNo: {
    type: String,
    default: undefined,
  },
  rollNo: {
    type: String,
    default: undefined,
  },
  role: {
    type: String,
    default: "user",
  },
  _assignedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  assignedDate: {
    type: Date,
    default: new Date(),
  },
  designation: String,
  specialization: String,
  description: String,
  attendance: [Date],
});

mongoose.model("users", userSchema);