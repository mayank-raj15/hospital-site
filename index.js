const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
require("./models/User");
require("./models/Activity");
require("./models/Attendance");
require("./models/Schedule");
require("./models/Appointment");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

// app.use() acts as a middleware which can update a request before it is received by the route handlers
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/adminRoutes")(app);
require("./routes/doctorRoutes")(app);
require("./routes/profileRoutes")(app);
require("./routes/scheduleRoutes")(app);
require("./routes/attendanceRoutes")(app);
require("./routes/appointmentRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
