const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

// CRUD Operations
router.post("/", jobController.createJob);
router.get("/", jobController.getJobs);
router.get("/:id", jobController.getJobById);
router.put("/:id", jobController.updateJob);
router.delete("/:id", jobController.deleteJob);

// Filter by status (open/close)
router.get("/jobs/status/:status", jobController.getJobsByStatus);

// Get jobs by company ID
router.get("/:company_id/jobs", jobController.getJobsByCompanyId);

module.exports = router;
