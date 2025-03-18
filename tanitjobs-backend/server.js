const express = require("express");
const { config } = require("./config/config");
const { userRouter, companyRouter } = require("./router/router");
const port = 5001;

const app = express();

app.use(express.json());
config();
app.use("/user", userRouter);
app.use("/company", companyRouter);
app.listen(port, () => {
  console.log("server is running");
});
