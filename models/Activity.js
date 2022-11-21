const mongoose = require("mongoose");
const { Schema } = mongoose;

const activitySchema = new Schema({
  userEmail: String,
  description: String,
  otherEmail: String,
  activityTime: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.model("activities", activitySchema);
