const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.set("strictQuery", true);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb database connection established successfully");
});

const postRouter = require("./routes/post");
app.use("/api/post", postRouter);

// const authRouter = require("./routes/auth");
// app.use("/api/auth", authRouter);

const userRouter = require("./routes/user");
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});