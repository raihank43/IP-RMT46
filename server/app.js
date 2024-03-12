const express = require("express");
const HomeController = require("./controllers/HomeController");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", HomeController.Home);

app.listen(port, () => {
  console.log("app running on port 3000");
});
