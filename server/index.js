require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
const connect = require("../server/database/database");
const apiRoute = require("../server/routes/user");
connect();
app.use("/api", apiRoute);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
