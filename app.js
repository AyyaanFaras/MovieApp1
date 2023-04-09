const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");

// DB CONNECTION
const Connection = require("./utils/dbConnect");
Connection();

const UserRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const movieRouter = require("./routes/moviesRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const cors = require("cors");

// static file
app.use(express.static(path.join(__dirname, "./../movies/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./../movies/build/index.html"));
});

// PORT NUMBER
const PORT = process.env.PORT;
app.use(cors());

// middleware routes
app.use(express.json());
app.use("/users", UserRouter);
app.use("/admin", adminRouter);
app.use("/movies", movieRouter);
app.use("/booking", bookingRouter);

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${PORT}`);
});
