const db = require("../../config/db");

// Create Company
const createCompany = (data, callback) => {
  const sql = `
    INSERT INTO companies (name, website, location, status)
    VALUES (?, ?, ?, ?)
  `;
  db.query(
    sql,
    [data.name, data.website, data.location, data.status || "active"],
    callback
  );
};

// Get All Companies
const getCompanies = (callback) => {
  db.query("SELECT * FROM companies", callback);
};

// Get Company by ID
const getCompanyById = (id, callback) => {
  db.query("SELECT * FROM companies WHERE id = ?", [id], callback);
};

// Update Company
const updateCompany = (id, data, callback) => {
  const sql = `
    UPDATE companies
    SET name = ?, website = ?, location = ?, status = ?
    WHERE id = ?
  `;
  db.query(
    sql,
    [data.name, data.website, data.location, data.status, id],
    callback
  );
};

// Delete Company
const deleteCompany = (id, callback) => {
  db.query("DELETE FROM companies WHERE id = ?", [id], callback);
};

// Get Companies by Status
const getCompaniesByStatus = (status, callback) => {
  const sql = `SELECT * FROM companies WHERE status = ?`;
  db.query(sql, [status], callback);
};

module.exports = {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  getCompaniesByStatus,
};
