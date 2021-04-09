const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/dbConnection").dbConnection();
require("express-async-errors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/test", (req, res) => {
  return res.send({ data: req.body });
});

app.use("/api/v1", require("./routes/index"));
app.use(function (err, req, res, next) {
  console.log(err);

  res.status(500).send({
    code: 500,
    message: [`Internal Server Error`],
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listing to PORT  : ${PORT}`));
