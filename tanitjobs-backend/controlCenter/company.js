const company = require("../schema/companySchema");
const jobs = require("../schema/jobSchema");
const users = require("../schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const codes = require("../schema/codes");
const dotenv = require("dotenv");
dotenv.config();

const secret = process.env.JWT_SECRET;

function generateCode() {
  return Math.random().toString(36).substring(2, 8);
}

exports.emailVerificationCompany = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "wajihkurousagi@gmail.com",
      pass: "vagm seay dcmo ltnz",
    },
  });
  try {
    const userFound = await company.findOne({ email });
    if (userFound) {
      res.status(400).send({ msg: "user already exists" });
    } else {
      const code = generateCode();
      console.log(code);
      const newCode = new codes({
        code,
        name,
        email,
        password,
        phone,
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

exports.signUpCompany = async (req, res) => {
  const code = req.body;
  console.log(code);
  try {
    const codeFound = await codes.findOne(code);
    console.log(codeFound);
    if (!codeFound) {
      res.status(400).send({ msg: "incorrect verification code" });
    } else {
      const salt = 10;
      const hPassword = bcrypt.hashSync(codeFound.password, salt);

      const user = new company({
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

exports.signInCompany = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await company.findOne({ email });

    if (!userFound) {
      res.status(400).send({ msg: "user does not exist" });
    } else {
      const verifPassword = bcrypt.compareSync(password, userFound.password);
      if (!verifPassword) {
        res.status(400).send({ msg: "password is incorrect" });
      } else {
        const token = jwt.sign(
          { name: userFound.name, email: userFound.email },
          secret,
          { expiresIn: "7d" }
        );
        res
          .status(200)
          .send({ msg: "login completed", user: userFound, token: token });
      }
    }
  } catch (error) {
    res.status(500).send({ msg: "error while trying to sign in" });
  }
};

exports.addJob = async (req, res) => {
  const { companyID } = req.body;
  console.log(companyID);
  try {
    const companyFound = await company.findById(companyID);
    console.log(companyFound);
    if (!companyFound) {
      res.status(400).send({ msg: "company does not exist in the database" });
    } else {
      const newJob = new jobs({
        company: companyFound._id,
        description: req.body.description,
        title: req.body.title,
        requirements: req.body.requirements,
        location: req.body.location,
      });
      await newJob.save();
      res.status(200).send({ msg: "job added successfully" });
    }
  } catch (error) {
    res.status(500).send({
      msg: "error while trying to add a new job",
      error: error.message,
    });
  }
};
