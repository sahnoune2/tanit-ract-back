const users = require("../schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const codes = require("../schema/codes");
const jobs = require("../schema/jobSchema");
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.JWT_SECRET;

function generateCode() {
  return Math.random().toString(36).substring(2, 8);
}

exports.emailVerification = async (req, res) => {
  const { email, password } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "wajihkurousagi@gmail.com",
      pass: "vagm seay dcmo ltnz",
    },
  });
  try {
    const userFound = await users.findOne({ email });
    if (userFound) {
      res.status(400).send({ msg: "user already exists" });
    } else {
      const code = generateCode();
      console.log(code);
      const newCode = new codes({
        code,
        email,
        password,
      });
      console.log(newCode);
      const mailOptions = {
        to: email,
        html: `
                  <h1>welcome to our website</h1>
                  <p>please click the link to verify your account</p>
                  <span>${code}</span>
                  
                  `,
      };
      await newCode.save();
      await transporter.sendMail(mailOptions, (error) => {
        if (error) throw error;
      });
      res.status(200).send({ msg: "mail sent successfully" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ msg: "error while trying to send a verification email" });
  }
};

exports.signUp = async (req, res) => {
  const { code } = req.body;

  console.log(code);
  try {
    const codeFound = await codes.findOne(code);
    console.log(codeFound);
    if (!codeFound) {
      res.status(400).send({ msg: "incorrect verification code" });
    } else {
      const salt = 10;
      const hPassword = bcrypt.hashSync(codeFound.password, salt);

      const user = new users({
        name: codeFound.name,
        email: codeFound.email,
        password: hPassword,
        phone: codeFound.phone,
      });
      await user.save();
      await codes.deleteOne(codeFound);
      res.status(200).send({ msg: "user added successfully" });
    }
  } catch (error) {
    res.status(500).send({ msg: "error while trying to add a new user" });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await users.findOne({ email });
    console.log(userFound);

    if (!userFound) {
      res.status(400).send({ msg: "user does not exist" });
    } else {
      const verifPassword = bcrypt.compareSync(password, userFound.password);
      if (!verifPassword) {
        res.status(400).send({ msg: "password is incorrect" });
      } else {
        const token = jwt.sign(
          { id: userFound._id, email: userFound.email },
          secret,
          { expiresIn: "7d" }
        );
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        res
          .status(200)
          .send({ msg: "login completed", user: userFound, token: token });
      }
    }
  } catch (error) {
    res.status(500).send({ msg: "error while trying to sign in" });
  }
};

exports.applyJob = async (req, res) => {
  const { jobID } = req.body;

  const userID = req.user._id;

  try {
    const jobFound = await jobs.findById(jobID);
    const userFound = await users.findById(userID);
    // console.log(userFound);
    if (!jobFound || !userFound) {
      res.status(400).send({ msg: "job/user is not found in the database" });
    } else {
      const jobsInUser = userFound.jobs.find((el) => el.toString() == jobID);

      if (!jobsInUser) {
        userFound.jobs.push(jobFound._id);
        jobFound.users.push(userFound._id);
        await userFound.save();
        await jobFound.save();
        res.status(200).send({ msg: "job added to user" });
      } else {
        res.status(400).send({ msg: "job already exists in users" });
      }
    }
  } catch (error) {
    res.status(500).send({
      msg: "error while trying to add a job to the user",
      error: error.message,
    });
  }
};

exports.deleteAllJobUser = async (req, res) => {
  const userID = req.user._id;

  try {
    const userFound = await users.findById(userID);

    if (!userFound) {
      res.status(400).send({ msg: "user not found " });
    } else {
      let allJobs = [...userFound.jobs];
      console.log(allJobs);
      await users.updateOne({ _id: userID }, { $set: { jobs: [] } });

      for (const item of allJobs) {
        await jobs.updateOne({ _id: item }, { $pull: { users: userID } });
      }
      //try with foreach

      res.status(200).send({ msg: "all jobs have been  deleted " });
    }
  } catch (error) {
    res.status(500).send({
      msg: "error while trying to delete all jobs from one user",
      error: error.message,
    });
  }
};

exports.deleteOneJobFromUser = async (req, res) => {
  const { jobID } = req.body;
  const userID = req.user._id;

  try {
    const jobFound = await jobs.findById(jobID);
    const userFound = await users.findById(userID);
    const jobInUser = userFound.jobs.find((el) => el.toString() == jobID);
    console.log(jobFound);
    console.log(userFound);
    if (!jobFound || !userFound || !jobInUser) {
      res.status(400).send({ msg: "user/job not found" });
    } else {
      await users.updateOne({ _id: userID }, { $pull: { jobs: jobID } });
      await jobs.updateOne({ _id: jobID }, { $pull: { users: userID } });
      res.status(200).send({ msg: "deleted a job successfully" });
    }
  } catch (error) {
    res.status(500).send({
      msg: "error while trying to delete an object from a user",
      error: error.message,
    });
  }
};

exports.getCurrent = (req, res) => {
  const user = req.user;
  if (user) {
    res.status(200).send({ msg: "u r logged in bro ", user });
  } else {
    res
      .status(500)
      .send({ msg: "error while trying to authentificate u ", error: error });
  }
};

exports.logOut = (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: true });
  res.status(200).send({ msg: "cookies deleted successfully " });
};
