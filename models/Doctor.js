const mongoose = require("mongoose");
const { Schema } = mongoose;

const doctorSchema = new Schema({});

mongoose.model("doctors", doctorSchema);
