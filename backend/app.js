const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const ticketRoutes = require("./routes/tickets");
const authRoutes = require("./routes/auth");
const insightRoutes = require('./routes/insights');

app.use(cors());
app.use(bodyParser.json());

app.use("/api/tickets", ticketRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/insights', insightRoutes);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const eventRoutes = require('./routes/eventRoutes');
app.use('/api', eventRoutes);