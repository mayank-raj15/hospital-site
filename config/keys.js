if (process.env.NODE_ENV === "production") {
  // send prod keys
  module.exports = require("./prod");
} else {
  // send dev keys
  module.exports = require("./dev");
}
