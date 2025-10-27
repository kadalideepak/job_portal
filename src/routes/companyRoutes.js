const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");

// CRUD
router.post("/", companyController.createCompany);
router.get("/", companyController.getCompanies);
router.get("/:id", companyController.getCompanyById);
router.put("/:id", companyController.updateCompany);
router.delete("/:id", companyController.deleteCompany);

// Filter by Status (active/inactive)
router.get("/status/:status", companyController.getCompaniesByStatus);

module.exports = router;
