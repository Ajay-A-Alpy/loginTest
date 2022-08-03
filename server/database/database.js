const mongoose = require("mongoose");
const connect = async () => {
  try {
    const con = mongoose.connect("mongodb://localhost:27017", {
      useNewUrlParser: "true",
      useUnifiedTopology: "true",
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connect;
