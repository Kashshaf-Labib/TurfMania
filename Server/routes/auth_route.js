const express = require("express");
const router = express.Router();

router.post('/login', (req, res) => {
    res.send(req.body);
});

router.post('/register', (req, res) => {
    res.send(req.body);
});

router.post('/logout', (req, res) => {
    res.send(req.body);
});

module.exports = router; // Changed from export default to module.exports
