const Users = require("../models/users");

const handleGetAllUsers = async (req, res) => {
  const allDBUsers = await Users.find({});
  return res.json(allDBUsers);
};

const hangleGetUserById = async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found!" });
  return res.json(user);
};

const handleUpdateUserById = async (req, res) => {
  await Users.findByIdAndUpdate(req.params.id, {
    jobTitle: req.body.jobTitle,
  });

  return res.status(200).json({ status: "success" });
};

const handleDeleteUserById = async (req, res) => {
  await Users.findByIdAndDelete(req.params.id);
  return res.status(200).json({ status: "success" });
};

const handleCreateNewUser = async (req, res) => {
  const body = req.body;
  const { firstName, lastName, email, gender, jobTitle } = body || {};

  if (!firstName || !lastName || !email || !gender || !jobTitle) {
    return res.status(400).json("All fields are required!");
  }

  const result = await Users.create({
    firstName,
    lastName,
    email,
    gender,
    jobTitle,
  });

  return res.status(201).json({ message: "success", id: result._id });
};

module.exports = {
  handleGetAllUsers,
  hangleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
