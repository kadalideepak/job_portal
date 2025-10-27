const db = require("../../config/db");

// Create Job
const createJob = (data, callback) => {
  const sql = `
    INSERT INTO jobs (company_id, title, description, salary_range, status)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [
      data.company_id,
      data.title,
      data.description,
      data.salary_range,
      data.status,
    ],
    callback
  );
};

// Get All Jobs
const getJobs = (callback) => {
  const sql = `
    SELECT jobs.*, companies.name AS company_name
    FROM jobs
    JOIN companies ON jobs.company_id = companies.id
  `;
  db.query(sql, callback);
};

// Get Job by ID
const getJobById = (id, callback) => {
  const sql = `
    SELECT jobs.*, companies.name AS company_name
    FROM jobs
    JOIN companies ON jobs.company_id = companies.id
    WHERE jobs.id = ?
  `;
  db.query(sql, [id], callback);
};

// Update Job
const updateJob = (id, data, callback) => {
  const sql = `
    UPDATE jobs
    SET company_id = ?, title = ?, description = ?, salary_range = ?, status = ?
    WHERE id = ?
  `;
  db.query(
    sql,
    [
      data.company_id,
      data.title,
      data.description,
      data.salary_range,
      data.status,
      id,
    ],
    callback
  );
};

// Delete Job
const deleteJob = (id, callback) => {
  db.query("DELETE FROM jobs WHERE id = ?", [id], callback);
};

// Get Jobs by Status (open/close)
const getJobsByStatus = (status, callback) => {
  const sql = `
    SELECT jobs.*, companies.name AS company_name
    FROM jobs
    JOIN companies ON jobs.company_id = companies.id
    WHERE jobs.status = ?
  `;
  db.query(sql, [status], callback);
};

// Get Jobs by Company ID
const getJobsByCompanyId = (company_id, callback) => {
  const sql = `
    SELECT jobs.*, companies.name AS company_name
    FROM jobs
    JOIN companies ON jobs.company_id = companies.id
    WHERE jobs.company_id = ?
  `;
  db.query(sql, [company_id], callback);
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobsByStatus,
  getJobsByCompanyId,
};
