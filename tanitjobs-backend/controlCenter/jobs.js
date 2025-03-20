const jobs = require("../schema/jobSchema");

const getJobs = async (req, res) => {
  try {
    const jobFound = await jobs.find();

    res.status(200).send({ msg: "jobs sent successfully", jobs: jobFound });
  } catch (error) {
    res.status(500).send({ msg: "error while trying to get ur jobs " });
  }
};

module.exports = { getJobs };
