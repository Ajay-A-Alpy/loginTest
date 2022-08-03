const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: {type: Number, required: true},
  uid: {type: String, required: true},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true},
  mobile: {type: String, required: true},
  password: {type: String, required: false},
  role: {type: String},
  status: {type: String},
});

module.exports = mongoose.model("users", userSchema);
