const express = require("express");

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    application: process.env.APP_NAME || "WebStore Core",
    version: process.env.APP_VERSION || "1.0.0",
    environment: process.env.NODE_ENV || "development",
    message: "API funcionando correctamente",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
