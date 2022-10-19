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
});

mongoose.model("users", userSchema);
