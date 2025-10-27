const User = require("../models/userModel");

// Create User
exports.createUser = (req, res) => {
  const { name, email, role, status } = req.body;
  const validStatuses = ["active", "inactive"];
  const validRoles = ["admin", "applicant", "employer"];

  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role value" });
  }

  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  User.createUser({ name, email, role, status }, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res
      .status(201)
      .json({ message: "User created successfully", data: results });
  });
};

// Get All Users
exports.getUsers = (req, res) => {
  User.getUsers((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ users: results });
  });
};

// Get User by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  User.getUserById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user: results[0] });
  });
};

// Update User
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, role, status } = req.body;
  const validStatuses = ["active", "inactive"];
  const validRoles = ["admin", "applicant", "employer"];

  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role value" });
  }

  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  User.updateUser(id, { name, email, role, status }, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User updated successfully" });
  });
};

// Delete User
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  User.deleteUser(id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  });
};

// Get Users by Status (active/inactive)
exports.getUsersByStatus = (req, res) => {
  const { status } = req.params;

  if (!["active", "inactive"].includes(status)) {
    return res.status(400).json({ message: "Invalid status parameter" });
  }

  User.getUsersByStatus(status, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ users: results });
  });
};
