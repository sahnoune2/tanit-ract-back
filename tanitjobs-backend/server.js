const express = require("express");
const { config } = require("./config/config");
const { userRouter, companyRouter, jobsRouter } = require("./router/router");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
config();
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/user", userRouter);
app.use("/company", companyRouter);
app.use("/jobs", jobsRouter);
app.listen(port, () => {
  console.log("server is running");
});
