const express = require("express");
const userRouter = require("./routes/api/users");
const db = require("./connectToDB");

const app = express();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Users api routes
app.use("/api/users", userRouter);

const port = 4000;

app.listen(port, () => console.log("Server Started"));