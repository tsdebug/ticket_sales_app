const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");
const authMiddleware = require("../middlewares/authMiddleware");

// 🔒 Protect this route with auth
router.post("/", authMiddleware, ticketController.createTicket);

module.exports = router;