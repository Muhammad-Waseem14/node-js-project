const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//connection
mongoose
  .connect("mongodb://127.0.0.1:27017/node-app")
  .then(() => console.log("Mongo db connected!"))
  .catch((error) => console.log("Mongo db error: ", error));

//schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    jobTitle: { type: String },
    gender: { type: String },
  },
  { timestamps: true }
);

const Users = mongoose.model("user", userSchema);

//middleware
app.use((req, res, next) => {
  fs.appendFile(
    "lot.txt",
    `${Date.now()}: ${req.method}: ${req.path}\n`,
    (error, data) => {
      next();
    }
  );
});

//send html as a response
app.get("/users", async (req, res) => {
  const allDBUsers = await Users.find({});
  const html = `
    <ul>
    ${allDBUsers
      .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
      .join("")}
    </ul>
    `;

  res.send(html);
});

//Get all users
app.get("/api/users", async (req, res) => {
  const allDBUsers = await Users.find({});
  return res.json(allDBUsers);
});

//Get user by specific id
app.get("/api/users/:id", async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.json(user);
});

//Create a new user
app.post("/api/users", async (req, res) => {
  const body = req.body;
  const { firstName, lastName, email, gender, jobTitle } = body || {};

  if (!firstName || !lastName || !email || !gender || !jobTitle) {
    return res.status(400).json("All fields are required!");
  }

  await Users.create({
    firstName,
    lastName,
    email,
    gender,
    jobTitle,
  });

  return res.status(201).json({ message: "success" });
});

//Update a specifc user
app.patch("/api/users/:id", async (req, res) => {
  await Users.findByIdAndUpdate(req.params.id, {
    jobTitle: req.body.jobTitle,
  });

  return res.status(200).json({ status: "success" });
});

//Delete a user
app.delete("/api/users/:id", async (req, res) => {
  await Users.findByIdAndDelete(req.params.id);
  return res.status(200).json({ status: "success" });
});

app.listen(8000, () => console.log(`Server running on port: 8000`));
