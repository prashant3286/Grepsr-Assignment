const express = require("express");
const router = express.Router();

const {
    sendEmail,
    getEmails,
} = require("../controllers/email");

router.get("/email", getEmails)
router.post("/email", sendEmail);

module.exports = router;
