const db = require("../../config/db");

// Create Application
const createApplication = (data, callback) => {
  const sql = `
    INSERT INTO applications (user_id, job_id, resume_url, status)
    VALUES (?, ?, ?, ?)
  `;
  db.query(
    sql,
    [data.user_id, data.job_id, data.resume_url, data.status || "active"],
    callback
  );
};

// Get All Applications
const getApplications = (callback) => {
  db.query("SELECT * FROM applications", callback);
};

// Get Application by ID
const getApplicationById = (id, callback) => {
  db.query("SELECT * FROM applications WHERE id = ?", [id], callback);
};

// Update Application
const updateApplication = (id, data, callback) => {
  const sql = `
    UPDATE applications
    SET user_id = ?, job_id = ?, resume_url = ?, status = ?
    WHERE id = ?
  `;
  db.query(
    sql,
    [data.user_id, data.job_id, data.resume_url, data.status, id],
    callback
  );
};

// Delete Application
const deleteApplication = (id, callback) => {
  db.query("DELETE FROM applications WHERE id = ?", [id], callback);
};

// Get Applications by Status (active/inactive)
const getApplicationsByStatus = (status, callback) => {
  const sql = `SELECT * FROM applications WHERE status = ?`;
  db.query(sql, [status], callback);
};

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  getApplicationsByStatus,
};
