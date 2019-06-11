const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect(
  "mongodb://admin:admin123@ds117848.mlab.com:17848/instagram-clone",
  { useNewUrlParser: true }
);

app.use((req, res, next) => {
  req.io = io;

  next();
});

app.use(cors());

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

app.use(require("./router"));

server.listen(3333);
