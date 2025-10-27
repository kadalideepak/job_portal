const db = require("../../config/db");

// Create User
const createUser = (data, callback) => {
  const sql = `
    INSERT INTO users (name, email, role, status)
    VALUES (?, ?, ?, ?)
  `;
  db.query(
    sql,
    [data.name, data.email, data.role, data.status || "active"],
    callback
  );
};

// Get All Users
const getUsers = (callback) => {
  db.query("SELECT * FROM users", callback);
};

// Get User by ID
const getUserById = (id, callback) => {
  db.query("SELECT * FROM users WHERE id = ?", [id], callback);
};

// Update User
const updateUser = (id, data, callback) => {
  const sql = `
    UPDATE users
    SET name = ?, email = ?, role = ?, status = ?
    WHERE id = ?
  `;
  db.query(sql, [data.name, data.email, data.role, data.status, id], callback);
};

// Delete User
const deleteUser = (id, callback) => {
  db.query("DELETE FROM users WHERE id = ?", [id], callback);
};

// Get Users by Status (active/inactive)
const getUsersByStatus = (status, callback) => {
  const sql = `SELECT * FROM users WHERE status = ?`;
  db.query(sql, [status], callback);
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUsersByStatus,
};
