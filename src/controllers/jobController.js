const Job = require("../models/jobModel");

// Create Job
exports.createJob = (req, res) => {
  const { company_id, title, description, salary_range, status } = req.body;

  if (!["open", "close"].includes(status)) {
    return res
      .status(400)
      .json({ message: "Invalid status. Must be open or close." });
  }

  Job.createJob(
    { company_id, title, description, salary_range, status },
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res
        .status(201)
        .json({ message: "Job created successfully", data: results });
    }
  );
};

// Get All Jobs
exports.getJobs = (req, res) => {
  Job.getJobs((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ jobs: results });
  });
};

// Get Job by ID
exports.getJobById = (req, res) => {
  const { id } = req.params;
  Job.getJobById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ job: results[0] });
  });
};

// Update Job
exports.updateJob = (req, res) => {
  const { id } = req.params;
  const { company_id, title, description, salary_range, status } = req.body;

  if (!["open", "close"].includes(status)) {
    return res
      .status(400)
      .json({ message: "Invalid status. Must be open or close." });
  }

  Job.updateJob(
    id,
    { company_id, title, description, salary_range, status },
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Job not found" });
      res.status(200).json({ message: "Job updated successfully" });
    }
  );
};

// Delete Job
exports.deleteJob = (req, res) => {
  const { id } = req.params;
  Job.deleteJob(id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.affectedRows === 0)
      return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job deleted successfully" });
  });
};

// Get Jobs by Status (open/close)
exports.getJobsByStatus = (req, res) => {
  const { status } = req.params;

  if (!["open", "close"].includes(status)) {
    return res.status(400).json({ message: "Invalid status parameter" });
  }

  Job.getJobsByStatus(status, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ jobs: results });
  });
};

// Get Jobs by Company ID
exports.getJobsByCompanyId = (req, res) => {
  const { company_id } = req.params;
  Job.getJobsByCompanyId(company_id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res
        .status(404)
        .json({ message: "No jobs found for this company" });
    res.status(200).json({ jobs: results });
  });
};
