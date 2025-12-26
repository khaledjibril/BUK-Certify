const express = require("express");
const { createTicket, getAllTickets, closeTicket } = require("../controllers/helpdeskController");

const router = express.Router();

router.post("/ticket", createTicket);
router.get("/", getAllTickets);           // Admin fetches tickets
router.put("/:id/close", closeTicket);    // Admin closes ticket + email


module.exports = router;
