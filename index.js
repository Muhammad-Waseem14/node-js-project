const express = require("express");
const fs = require("fs");

const users = require("./MOCK_DATA.json");

const app = express();

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
app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;

  res.send(html);
});

//send json data as a response
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

app.listen(8000, () => console.log(`Server running on port: 8000`));
