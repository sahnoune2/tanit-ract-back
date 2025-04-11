const express = require("express");
const { config } = require("./config/config");
const { userRouter, companyRouter, jobsRouter } = require("./router/router");
<<<<<<< HEAD

=======
const port = 10000;
>>>>>>> b7117ccbf1ddee22e0ad35138cb1245783013f34
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 5000;

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
