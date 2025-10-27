const Application = require("../models/applicationModel");

// Create Application
exports.createApplication = (req, res) => {
  const { user_id, job_id, resume_url, status } = req.body;
  const validStatuses = ["active", "inactive"];

  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  Application.createApplication(
    { user_id, job_id, resume_url, status },
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res
        .status(201)
        .json({ message: "Application created successfully", data: results });
    }
  );
};

// Get All Applicationss
exports.getApplications = (req, res) => {
  Application.getApplications((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ applications: results });
  });
};

// Get Application by ID
exports.getApplicationById = (req, res) => {
  const { id } = req.params;
  Application.getApplicationById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(404).json({ message: "Application not found" });
    res.status(200).json({ application: results[0] });
  });
};

// Update Application
exports.updateApplication = (req, res) => {
  const { id } = req.params;
  const { user_id, job_id, resume_url, status } = req.body;
  const validStatuses = ["active", "inactive"];

  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  Application.updateApplication(
    id,
    { user_id, job_id, resume_url, status },
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Application not found" });
      res.status(200).json({ message: "Application updated successfully" });
    }
  );
};

// Delete Application
exports.deleteApplication = (req, res) => {
  const { id } = req.params;
  Application.deleteApplication(id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.affectedRows === 0)
      return res.status(404).json({ message: "Application not found" });
    res.status(200).json({ message: "Application deleted successfully" });
  });
};

// Get Applications by Status
exports.getApplicationsByStatus = (req, res) => {
  const { status } = req.params;

  if (!["active", "inactive"].includes(status)) {
    return res.status(400).json({ message: "Invalid status parameter" });
  }

  Application.getApplicationsByStatus(status, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ applications: results });
  });
};
