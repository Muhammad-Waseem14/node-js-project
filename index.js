const express = require("express");
const bodyParser = require("body-parser");

const { connectMongoDb } = require("./connections");
const { logReqRes } = require("./middlewares");
const userRouter = require("./routes/users");

const app = express();

//Db connection
connectMongoDb("mongodb://127.0.0.1:27017/node-app").then(() =>
  console.log("Mongo Db connected!")
);

//Middleware
app.use(logReqRes("log.txt"));
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use("/api/users", userRouter);

//Server
app.listen(8000, () => console.log(`Server running on port: 8000`));
