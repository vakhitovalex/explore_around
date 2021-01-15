const express = require("express");
const https = require("https");
const path = require("path");
// const fs = require('fs');

const app = express();
const { PORT = 3000 } = process.env;

const userRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

app.use(express.static(path.join(__dirname, "public")));
app.use("/", userRouter);
app.use("/", cardsRouter);
app.get("*", (req, res) => {
  res.send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`App is working at ${PORT}`);
});
