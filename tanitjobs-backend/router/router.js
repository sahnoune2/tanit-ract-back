const express = require("express");
const {
  signUp,
  emailVerification,
  signIn,
  applyJob,
  deleteAllJobUser,
  deleteOneJobFromUser,
} = require("../controlCenter/users");
const {
  signUpCompany,
  signInCompany,
  emailVerificationCompany,
  addJob,
} = require("../controlCenter/company");
const { isAuth } = require("../auth/isAuth");
const { getJobs } = require("../controlCenter/jobs");

const userRouter = express.Router();
const companyRouter = express.Router();
const jobsRouter = express.Router();

//user router
userRouter.post("/signUp", signUp);
userRouter.post("/emailVerif", emailVerification);
userRouter.post("/signIn", signIn);
userRouter.post("/applyJob", isAuth, applyJob);
userRouter.delete("/deleteAllJobs", isAuth, deleteAllJobUser);
userRouter.delete("/deleteOneJob", isAuth, deleteOneJobFromUser);

//company router
companyRouter.post("/signUp", signUpCompany);
companyRouter.post("/signIn", signInCompany);
companyRouter.post("/emailVerif", emailVerificationCompany);
companyRouter.post("/addJob", addJob);

//jobs router

jobsRouter.get("/getJobs", getJobs);

module.exports = { userRouter, companyRouter, jobsRouter };
