const express = require("express");
const noteRouter = require("./noteRouter");
const router = express.Router();

router.use("/notes", noteRouter);

module.exports = router;

