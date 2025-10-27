const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");

// CRUD
router.post("/", applicationController.createApplication);
router.get("/", applicationController.getApplications);
router.get("/:id", applicationController.getApplicationById);
router.put("/:id", applicationController.updateApplication);
router.delete("/:id", applicationController.deleteApplication);

// Filter by status (active/inactive)
router.get("/status/:status", applicationController.getApplicationsByStatus);

module.exports = router;
