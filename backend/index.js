const express = require("express");
require("dotenv").config();
require("./config/dbConnection").dbConnection();
require("express-async-errors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", require("./routes/index"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listing to PORT  : ${PORT}`));
