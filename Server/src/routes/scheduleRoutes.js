// routes/scheduleRoutes.js
const express = require("express");
const {
  getSchedule,
  addSchedule,
} = require("../controllers/scheduleController");
const router = express.Router();

router.get("/getschedule", getSchedule);
router.post("/addschedule", addSchedule);
module.exports = router;
