const Job = require("../schema/job"); // Adjust the path as needed

const display_all_jobs = async (req, res) => {
  try {
    const allJobs = await Job.aggregate([{ $project: { _id: 0 } }]);
    res.json(allJobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).send("Error fetching jobs");
  }
};

const create_job = async (req, res) => {
  const newJobId = Math.floor(Math.random() * 9000000000) + 1;
  try {
    const newCreatedJob = new Job({
      jobId: newJobId,
      companyName: req.body.companyName,
      position: req.body.position,
      contract: req.body.contract,
      location: req.body.location,
      applied: req.body.applied || [],
    });
    await newCreatedJob.save();
    // Update the project collection based on the projects array in employee object
    const alljobs = await Job.aggregate([{ $project: { _id: 0 } }]);
    res.send(alljobs);
    res.end();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
    res.end();
  }
};

const edit_job = async (req, res) => {
  try {
    const editedJob = req.body.job;
    if (req.body.userId) {
      const userId = req.body.userId;
      editedJob.applied.push(userId);
    }
    await Job.replaceOne({ jobId: editedJob.jobId }, editedJob);
    // Update the project collection based on the projects array in employee object
    const alljobs = await Job.aggregate([{ $project: { _id: 0 } }]);
    res.send(alljobs);
    res.end();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
    res.end();
  }
};

const delete_job = async (req, res) => {
  try {
    // Parse jobId from request parameters
    const deleteJobId = Number(req.params.jobId);

    // Ensure jobId is a number
    if (isNaN(deleteJobId)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    // Delete the job document
    await Job.deleteOne({ jobId: deleteJobId });

    // Aggregate all jobs after deletion
    const allJobs = await Job.aggregate([{ $project: { _id: 0 } }]);

    // Send the updated list of jobs
    res.json(allJobs);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error deleting job" });
  }
};

module.exports = {
  display_all_jobs,
  create_job,
  edit_job,
  delete_job,
};
