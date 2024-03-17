if (process.env.NODE_ENV !== "production") { // mulai sekarang pakai dotenv config kalau tidak pada masa production
  require("dotenv").config(); // ini harus di apply paling awal
}

const express = require("express");
const app = express();

const port = 3000;
const cors = require("cors");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(router);

app.use(errorHandler);

module.exports = app;
