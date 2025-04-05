const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const ticketRoutes = require("./routes/tickets");
const authRoutes = require("./routes/auth");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/tickets", ticketRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});