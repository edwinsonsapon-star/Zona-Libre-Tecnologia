const express = require("express");
const cors = require("cors");
const healthRoutes = require("./routes/health.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "WebStore Core Backend funcionando correctamente",
  });
});

app.use("/api", healthRoutes);

module.exports = app;
