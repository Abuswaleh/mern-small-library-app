const express = require("express");
const app = express();

const userRoute = require("./routes/userRoute");
const bookRoute = require("./routes/bookRoute");

const cors = require("cors");
app.use(cors());
app.use(express.json());

const authValidation = require("./middlewares/authMiddleware");
app.use("/books", authValidation);

app.use("/user", userRoute);
app.use("/books", bookRoute);

module.exports = app;
