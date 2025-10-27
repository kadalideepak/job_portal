const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// CRUD
router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

// Filter by status (active/inactive)
router.get("/status/:status", userController.getUsersByStatus);

module.exports = router;
