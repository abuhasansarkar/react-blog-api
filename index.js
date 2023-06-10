const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8800;

const authRouter = require("./router/auth")

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.DATABASE_INFO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected!"))
  .catch((error) => console.log(error));


// All Routers
app.use("/api/v1/", authRouter)


// app.get("/", (req, res) => {
//   res.send("Welcome to Backend Server");
// });

app.listen(port, () => {
  console.log(`Server is runing on the port ${port}`);
});
