const express = require("express");

const {
  handleGetAllUsers,
  hangleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/users");

const router = express.Router();

//Get all users
router.get("/", handleGetAllUsers);

//Get user by specific id
router.get("/:id", hangleGetUserById);

//Create a new user
router.post("/", handleCreateNewUser);

//Update a specifc user
router.patch("/:id", handleUpdateUserById);

//Delete a user
router.delete("/:id", handleDeleteUserById);

module.exports = router;
