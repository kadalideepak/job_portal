const Company = require("../models/companyModel");

// Create Company
exports.createCompany = (req, res) => {
  const { name, website, location, status } = req.body;
  const validStatuses = ["active", "inactive"];

  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  Company.createCompany({ name, website, location, status }, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res
      .status(201)
      .json({ message: "Company created successfully", data: results });
  });
};

// Get All Companies
exports.getCompanies = (req, res) => {
  Company.getCompanies((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ companies: results });
  });
};

// Get Company by ID
exports.getCompanyById = (req, res) => {
  const { id } = req.params;
  Company.getCompanyById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(404).json({ message: "Company not found" });
    res.status(200).json({ company: results[0] });
  });
};

// Update Company
exports.updateCompany = (req, res) => {
  const { id } = req.params;
  const { name, website, location, status } = req.body;
  const validStatuses = ["active", "inactive"];

  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  Company.updateCompany(
    id,
    { name, website, location, status },
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Company not found" });
      res.status(200).json({ message: "Company updated successfully" });
    }
  );
};

// Delete Company
exports.deleteCompany = (req, res) => {
  const { id } = req.params;
  Company.deleteCompany(id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.affectedRows === 0)
      return res.status(404).json({ message: "Company not found" });
    res.status(200).json({ message: "Company deleted successfully" });
  });
};

// Get Companies by Status
exports.getCompaniesByStatus = (req, res) => {
  const { status } = req.params;

  if (!["active", "inactive"].includes(status)) {
    return res.status(400).json({ message: "Invalid status parameter" });
  }

  Company.getCompaniesByStatus(status, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ companies: results });
  });
};
